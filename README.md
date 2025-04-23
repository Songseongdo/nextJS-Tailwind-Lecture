# 스펙

-   bcrypt: 5.1.1
-   next: 14.1.0
-   react: 18.20
-   recoil: 0.7.7
-   tailwindcss: 4.1.3
-   validator: 13.15.0
-   zod: 3.24.2
-   prisma: 6.6.0
-   iron-session: 8.0.4

# Server Action

1. Server Action 은 POST 전용

2. GET 방식 호출은 불가
   <br />
   <br />

# [useFormStatus](https://ko.react.dev/reference/react-dom/hooks/useFormStatus)

1. useFormStatus Hook은 form 내부에 렌더링한 컴포넌트에서 호출

2. useFormStatus는 오직 상위 form 에 대한 상태 정보만 반환. 동일한 컴포넌트나 자식 컴포넌트에서 렌더링한 form의 상태 정보는 반환.
   <br />
   <br />

# [useFormState(v18), useActionState(v19)](https://ko.react.dev/reference/react/useActionState)

1. React 서버 컴포넌트를 지원하는 프레임워크에서 useActionState를 사용하면, 클라이언트 자바스크립트 실행 전에도 폼과 상호작용할 수 있음.

    만약 서버 컴포넌트를 사용하지 않는다면, 이는 단순히 컴포넌트 지역 State와 동일하게 동작.

2. useActionState에 전달된 함수는 첫 번째 인수로 이전 또는 초기 State를 추가로 받음. 즉, 직접 폼 액션을 사용했을 때와 비교해 함수의 시그니처가 달라질 수 있음
   <br />
   <br />

# Validator

1. formErrors -> fieldErros

<details>
<summary>superRefine</summary>

```ts
.superRefine((val, ctx) => {
    if (!validator.isMobilePhone(val, "ko-KR")) {
        ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "유효한 휴대폰 번호를 입력해주세요.",
        path: ["phonenumber"],
        });
    }
});
```

</details>
<br /><br /><br />

# Prisma

<details>
<summary>설치 & 초기설정</summary>

```
npm install prisma
```

```
npx prisma init
```

> prisma/schema.prisma 파일 생성

> .env 파일 생성

```
npx prisma migrate dev
```

> schema.prisma 에 선언된 datasource와 model 로 db 생성

> TypeScript 타입도 자동 업데이트 됨

```
npx prisma studio
```

> DB GUI Tool

</details>

1.  prima는 DB와의 통역사 역할

2.  npx prism migrate dev 를 통해서 Client 생성

3.  index.d.ts 생성 위치 (TS)

    > v5 : node_modules / .prisma

    > v6 : prisma / generated / prisma

4.  schema 변경 시 migrate dev 를 반드시 해야 함

5.  플러그인 prisma 다운 cmd + shift + p로 JSON settings 파일을 열고 추가하면 save시 릴레이션 자동완성 됩니다.

    ```
    "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
    }
    ```

6.  [onDelete](./prisma/schema.prisma)

    관계성에 따라서 옵션을 지정해 주어야 함

7.  [Authentication with Zod](./app/create-account/actions.ts)

    DB 사용을 위해서 async/await 사용이 필요

    safeParse() => safeParseAsync() 변경 필요

8.  [hashing password](./app/create-account/actions.ts)
    <details>
    <summary>코드</summary>

    ```ts
    import bcrypt from "bcrypt";

    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    ```

    </details>

9.  [use cookie](./app/create-account/actions.ts)
    <details>
    <summary>iron-session를 통한 crypt</summary>

    ```ts
    import { getIronSession } from "iron-session";
    import { redirect } from "next/navigation";

    // log the user in
    const cookie = await getIronSession(cookies(), {
    	cookieName: "delicious-carrot",
    	password: process.env.COOKIE_PASSWORD || "",
    });

    // @ts-ignore
    cookie.id = user.id;
    await cookie.save();
    ```

    </details>

10. [Email Log In](./app/login/actions.ts)
    <details>
    <summary>DB 확인 후 crypt 값과 비교</summary>

    ```ts
    const user = await db.user.findUnique({
    	where: {
    		email: result.data.email,
    	},
    	select: {
    		id: true,
    		password: true,
    	},
    });

    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    if (ok) {
    	const session = await getSession();
    	session.id = user!.id;
    	redirect("/profile");
    } else {
    	return {
    		success: false,
    		fieldErrors: { password: ["Wrong password."] },
    	};
    }
    ```

    </details>

11. [Log Out](./app/profile/page.tsx)

    Log out 기능을 Button 이 아닌 Form action에 넣어서 "use client" 가 아닌 "use server" 호출

    <details>

    <summary>log out</summary>

    ```ts
    const logout = async () => {
    	"use server";
    	const session = await getSession();
    	await session.destroy();

    	redirect("/");
    };
    ```

    ```typescript
    <form action={logout}>
    	<Button $text="Log Out"></Button>
    </form>
    ```

    </details>

12. [middleware](middleware.ts)

    파일명은 반드시 **middleware**

    함수명은 반드시 **"middleware", "config"**

    모든 request 마다 호출 됨.

    config를 통해서 실행하지 않을 url 를 설정할 수 있음.

    <details>
    <summary>redirect</summary>

    ```ts
    export async function middleware(request: NextRequest) {
    	const session = await getSession();

    	if (request.nextUrl.pathname === "/profile") {
    		return NextResponse.redirect(new URL("/", request.url));
    	}
    }
    ```

    </details>

    <details>
    <summary>config matcher</summary>

    ```ts
    export const config = {
    	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    };
    ```

    </details>

    <details>
    <summary>authentication middleware</summary>

    ```ts
    const session = await getSession();
    const exists = publicOnyUrls[request.nextUrl.pathname];
    if (!session.id) {
    	if (!exists) {
    		return NextResponse.redirect(new URL("/", request.url));
    	}
    } else {
    	if (exists) {
    		return NextResponse.redirect(new URL("/", request.url));
    	}
    }
    ```

    </details>

13. Edge Function

    node.js 의 경량 버전

    middleware 는 node runtime 에 실행되지 않음

    모든 node.js 의 코드 및 NPM 을 사용할 수 있지 않음

<br /><br /><br />

# 이슈 해결

1. input 전환 시 이전 데이터 남는 문제

<details>
<summary>고유한 key 값을 지정하면 다른 컴포넌트로 인식</summary>

```ts
{
	state?.token ? (
		<FormInput
			key="verifycode"
			type="number"
			placeholder="Verification code"
			required
			min={100000}
			max={999999}
			$name="verifycode"
			$errors={getError(state, "verifycode")}
		/>
	) : (
		<FormInput
			key="phonenumber"
			type="number"
			placeholder="Phone number"
			required
			$name="phonenumber"
			$errors={getError(state, "phonenumber")}
		/>
	);
}
```

</details>
