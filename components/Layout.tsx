import {PropsWithChildren} from "react";
import styles from  './Layout.module.css'

export default function Layout(props: PropsWithChildren<unknown>){
  return (
    <div className={styles.container}>{props.children}</div>
  )
}
