import React, {useState, useEffect} from 'react';
import {ViewData} from './Components/ViewData.jsx';
import {Toast} from './Components/Toast.jsx';


export const App = () => {

   const [title , setTitle] = useState('');
   const [description , setDescription] = useState('');
   const [data , setData] = useState([]);
   const[editMode, setEditMode] = useState(false);
   const [idElement , setIdElement] = useState();
   const [toastOptions, setToastOptions] = useState([false, '' ,'',])


   const addTask = (e)=>{
      e.preventDefault();
      const itemNum = data.length + 1;
      title.length !== 0 && description.length !== 0 ? (console.log('Enviado')) : (console.log('No Enviado'))

      const task = {itemNum, title, description };

      console.log(task)

      fetch('https://nodejs-mongodb-for-react.herokuapp.com/api/tasks/',{
         method: 'POST',
         body: JSON.stringify(task),
         headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',

         }, 
         
      })
         .then(json => json.json())
         .then(json =>{ 
            setDescription('');
            setTitle('')
            getData();
            setToastOptions([true, 'success' ,`Task ${data.length + 1} Saved`])

            
         })
         .catch(nojson => console.log(nojson))


   }

   const handleChange = (e)=>{
      
      const {name, value} = e.target
      name ==='title' ? (setTitle(value)): (setDescription(value))
      console.clear()
      console.log('title', title , '\n\ndescription, ', description  )
   }

   useEffect(()=>{
      getData();

   }, [])

   const getData = ()=>{

      fetch('https://nodejs-mongodb-for-react.herokuapp.com/api/tasks/')
         .then(res => res.json())
         .then(items =>{
            setData(items)
         })

   }

   const editting = (e, id ,titleForEdit, descriptionForEdit)=>{
      e.preventDefault();
      setEditMode(true)
      setToastOptions([true, 'info', 'editting...'])
      console.clear()
      setTitle(titleForEdit)
      setDescription(descriptionForEdit)

      console.log('Title: ', title, '\n\n Description: ', description)

      setIdElement(id)

   }

   const editTask = (e)=>{
      e.preventDefault();
      console.log(idElement)
      const task = {title, description}
      console.log(task)
      fetch(`https://nodejs-mongodb-for-react.herokuapp.com/api/tasks/${idElement}`, { method: 'PUT' , headers:{

         'Accept': 'aplication/json',
         'Content-type': 'application/json',

      },
      body: JSON.stringify(task)})
         .then(res => res.json())
         .then((_data) => {
            // console.log(items)
            console.log(_data)
            getData()
            setTitle('');
            setDescription('');
            setEditMode(false);
            setToastOptions([true, 'success', `Task Edited`])
         })
   }

   const deleteOneData = (e,id)=>{
      e.preventDefault()
      fetch(`https://nodejs-mongodb-for-react.herokuapp.com/api/tasks/${id}`, {method:'DELETE'})
         .then(() =>{ 
         
            getData()
            setTitle('');
            setDescription('');
            setEditMode(false)
            setToastOptions([true, 'danger', `Task Deleted`])

         })
   }


   const deleteAllData = async (_id)=>{

      data.length > 0 ? 
      (
            fetch('https://nodejs-mongodb-for-react.herokuapp.com/api/tasks/', { method: 'DELETE' })
               .then(message => {
                  console.log(message)
                  setTitle('');
                  setDescription('');
                  setEditMode(false)
                  getData()
                  setToastOptions([true, 'danger', `All Elements Has Been Deleted`])
               })
      ) :
      (
         setToastOptions([true, 'info', `There's not elements To Remove`])

      )
   }



   return (
      <div>
         {/**NAVIGATION */}
         <nav className="light-blue darken-4">
            <div className="container">
               <a href="/" className="brand-logo">MERN Stack</a>
            </div>
         </nav>
         
         <div className="container">
            <div className="row">
               <div className="col s5">

                     <div className="card">

                        <div className="card-content">
                           <form onSubmit={(e)=>(addTask(e))}>
                           <div className="row">
                              <div className="input-field col s12">
                                 <input type="text" placeholder="Task Title" name="title" value={title} onChange = {(e)=>{handleChange(e)}} />
                              </div>
                           </div>
                           <div className="row">
                              <div className="input-field col s12">
                                 <textarea placeholder="Task Description" name="description" value={description} onChange={(e)=>{handleChange(e)}} className= "materialize-textarea" />
                              </div>
                           </div>

                           <div className="row">
                             { !editMode ?  (<button type="submit" className="btn col s6 btn-light-blue darken-4">Send</button>): 
                                 (<button type="button" onClick={(e) => {editTask(e)}} className="btn col s6 btn-light-blue darken-4">Edit</button>)}
                              <button type="button" onClick={deleteAllData} className="btn col s6 pink darken-1">Delete All</button>
                              
                           </div>                           

                           </form>
                        {
                           toastOptions[0] ?

                              (
                              <span onClick={(e)=>{e.preventDefault(); setToastOptions([false, '', ''])}}>
                                 <Toast message={toastOptions[2]} type={toastOptions[1]} />
                              </span>
                              ) : (<></>)
                        }

                        </div>

                     </div>

               </div>


               <div className="col s7">

                 { data ? (<ViewData dataFetched={data} deleteOneData={deleteOneData} editMode = {editting} />) :(<></>)}

               </div>
            </div>
         </div>

      </div>
   )
}
