import React, {useState} from "react"
import style from './Style/toastStyle.module.css'

export const Toast = (props) => {

   return (
      <div className={style.toastContainer}>
         {
            props.type ==='success' ? 
            (
                  <div className={style.success}>
                     <p message>{props.message}</p>
                  </div>
            )
            :
            props.type === 'danger' ?
            (
                  <div className={style.danger}>
                     <p message>{props.message}</p>
                  </div>
            )
            :
            props.type === 'info' ?

            (
               
               <div className={style.edit}>
                  <p message>{props.message}</p>
               </div>
               
            )
            :
            (<></>)
         }
      </div>
   )
}
