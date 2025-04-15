import { getBookDetail } from "../../../api";
import styles from "../../../styles/detail.module.css";

interface IParams {
	params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: IParams) {
	const { name } = await params;

	return {
		title: `${name}`,
	};
}

export default async function BookDetail({ params }: IParams) {
	const { name } = await params;
	const detail = (await getBookDetail(name)).results;
	return (
		<div className={styles.container}>
			<div className={styles.title}>{detail.list_name_encoded}</div>
			<div className={styles.book_detail_container}></div>
		</div>
	);
}
