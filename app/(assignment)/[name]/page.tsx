"use client";

import { useEffect, useState } from "react";
import Challenge24 from "../components/challenge24";
import { notFound, useParams } from "next/navigation";
import { JSX } from "react/jsx-runtime";

export default function AssignmentRoot() {
	const params = useParams();
	const [component, setComponent] = useState<JSX.Element | null>(null);
	const [init, setInit] = useState(false);

	useEffect(() => {
		if (params.name.includes("assignment24")) {
			setComponent(Challenge24);
		} else {
			setTimeout(() => {
				setComponent(notFound);
			}, 200);
		}

		setInit(true);
	}, [params]);

	return <div>{init && component ? component : null}</div>;
}
