### Bubble Layout

![a](./img/bubble_layout.png)

tabs 의 안에 있는 모든 page 의 layout 적용

### image 옵션

> next/image에서 외부 URL 을 불러올 수 있도록 허용

> next.config.js

```TS
images: {
    unoptimized: true,
    remotePatterns: [
        {
            hostname: "avatars.githubusercontent.com",
        },
        {
            hostname: "imagedelivery.net",
        },
    ],
},
```

### Prisma 서버 타입 가져오기

```TS
export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;
```

### infinite Scrolling

```TS
const observer = new IntersectionObserver(
    async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
            observer.unobserve(trigger.current);
            setIsLoading(true);
            const newProducts = await getMoreProducts(page + 1);
            if (newProducts.length !== 0) {
                setPage((prev) => prev + 1);
            } else {
                setIsLastPage(true);
            }

            setProducts((prv) => [...prv, ...newProducts]);
            setIsLoading(false);
        }
    }
);

if (trigger.current) {
    observer.observe(trigger.current);
}

return () => {
    observer.disconnect();
};
```
