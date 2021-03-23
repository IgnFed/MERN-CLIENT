import React from 'react'

export const ViewData = (props) => {


   return (
      <>

         <table>
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Options</th>
               </tr>
            </thead>
            <tbody>
               {props.dataFetched.map((item) => (
                  
                     <tr key={item._id}>
                        <td>
                           {item.title}
                        </td>
                        <td>
                           {item.description}
                        </td>

                        <td>
                           <td>
                           <button className="btn teal accent-1 black-text" onClick={(e) => { props.editMode(e, item._id, item.title, item.description)  }} 
                           >
                              <i  style={{fontSize: "30px", textAlign:'center'}} className="fas fa-edit"></i>
                           </button>
                           </td>

                           <td>
                           <button className="btn red lighten-1 black-text" onClick={(e) => { props.deleteOneData(e, item._id)  }} 
                           >
                              
                              <i style={{ fontSize: "30px", textAlign: 'center'}} className="fas fa-trash"></i>
                           
                           </button>
                           </td>
                        </td>

                     </tr>

                  
               ))}
            </tbody>
         </table>

         
      </>
   )
}
