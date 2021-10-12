import React, { Fragment,useState } from 'react';
import { Button,Modal, ModalHeader, ModalBody,ModalFooter,Form, FormGroup, Label, Input} from 'reactstrap';
function Task(){
  const [isModalOpen, setShow] = useState(false);
  const [taskDetail, setTaskDetails] = useState([]);
  const [taskList, setList] = useState([]);
  const [counter, setCounter] = useState(1);
  const [taskData, setTaskData] = useState({id:null,flag:true,task:'',project:'',comments:''});
 // const [taskerror, setTaskError] = useState({error:''}); 
  const [Header, setHeader] = useState('Create'); 
  const toggleModal =()=> {
    resetFormData();
    setHeader('Create')
    setShow(!isModalOpen);
    
  }
  function handleEdit(event,id){
    event.preventDefault();
    const editTaskData= taskDetail.filter(item=>{ return item.id===id})
    setHeader('Edit')
    setTaskData(editTaskData[0])
    setShow(!isModalOpen);
  }
  const handleChange =(e) => {
    let ename =e.target.name;
    let val =e.target.value;
    setTaskData(prevState => ({
      ...prevState,[ename]:val
    }));
  }
  function handleDelete(event,id){
      event.preventDefault();
      const deleteTaskData = taskDetail.filter(item=>{ return item.id===id})
      deleteTaskData[0].flag=false;
      updateList();
      resetFormData();
  }
  function validateForm(){
    let flag=false;
    if(taskData.task.length===0){
      alert('please enter task')
      flag=false;
    }else if(taskData.project.length===0){
      alert('please select project')
      flag=false;
    }else{
      flag=true;
    }
    return flag;
  }
  function handleSubmit(event) {
    event.preventDefault();
    let commentDataObj = {};
    const flag =validateForm();     
    if(flag===true){
      if( taskData.id == null) { 
          setCounter(counter+1);
          commentDataObj.id = counter;
          commentDataObj.flag = true;
          const newTaskData= Object.assign(taskData,commentDataObj)
          setTaskData(newTaskData);
          let taskDetailArr = taskDetail;
          taskDetailArr.push(taskData);
          setTaskDetails(taskDetailArr);     
          updateList();   
      }else{
        //Edit operation
      }    
      resetFormData();   
      toggleModal();
    }
    else{
      return flag;
    }
  }
  const resetFormData=()=>{
    setTaskData({id:null,flag:true,task:'',project:'',comments:''});
  }
  const updateList =()=>{
    const taskArr = taskDetail.filter(item=>item.flag===true);
    setList(taskArr);
  }
    return(
        <Fragment>  
          <div className="container-fluid">
            <div className="row bg-secondary">
                <h1 className="p-2 text-white">Company Name</h1>
            </div>
              <div className="container">
                <div className="row mt-5" id="row2">
                  <div><i className="fa fa-plus-circle" onClick={toggleModal} ></i></div>
                  <div className="pl-4">  <p onClick={toggleModal} >Create Task</p></div>
                    <Modal isOpen={isModalOpen} toggle={toggleModal}>     
                      <Form onSubmit={handleSubmit}>
                        <ModalHeader toggle={toggleModal}> {Header} Task</ModalHeader>
                        <ModalBody>                        
                            <FormGroup>
                              <Label for="task">Task Name</Label>
                              <Input type="text" name="task" id="task" value={taskData.task} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                              <Label for="project">Project Name</Label>
                              <Input type="select" name="project" id="project"  value={taskData.project} onChange={handleChange} >
                              <option value="">Select Project</option>
                              <option value="java">Java Project</option>
                              <option value="python">Python Project</option>
                              <option  value="devops">Devops Project</option>
                        
                            </Input>
                            </FormGroup>
                            <FormGroup>
                              <Label for="comments">Comments</Label>
                              <Input type="textarea" name="comments" id="comments"   value={taskData.comments} onChange={handleChange}  />
                            </FormGroup>                       
                        </ModalBody>
                        <ModalFooter>
                          <Button variant="primary" onClick={toggleModal}>
                          Cancel
                          </Button>   
                          <Button type="submit" value="submit"  color="primary">Create</Button>         
                        </ModalFooter>
                        </Form>
                   </Modal>
                </div>        
                  {/*table row */}      
                 <div className="row mt-5">
                    <table className="table">
                    <thead  className="thead-light" >
                        <tr className="trow">
                        <th scope="col">Task ID</th>
                        <th scope="col">Task Name</th>
                        <th scope="col">Project</th>
                        <th scope="col">Comments</th>
                        <th scope="col">Task Edit</th>
                        <th scope="col">Task Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { taskList.map(itemVal=>                          
                          <tr>
                          <th scope="row">{itemVal.id}</th>
                          <td>{itemVal.task}</td>
                          <td>{itemVal.project}</td>
                          <td>{itemVal.comments}</td>
                          <td><button type="submit"  onClick={(e)=>{handleEdit(e,itemVal.id)}}>Edit</button></td>
                          <td><button type="button" onClick={(e)=>{handleDelete(e,itemVal.id)}}>Delete</button></td>
                          </tr>               
                    )}
                    </tbody>
                    </table>
                </div>
            </div>
            </div>
        </Fragment>
    )
}
export default Task;



