import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				
			</nav>
		</div>
	);
};

export default Main;
