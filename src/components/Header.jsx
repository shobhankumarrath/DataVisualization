import Styles from "./header.module.css";
export default function header() {
  return (
    <div className={Styles.headerBackground}>
      <div className={Styles.header}>Data Visualization Tool</div>
    </div>
  );
}
