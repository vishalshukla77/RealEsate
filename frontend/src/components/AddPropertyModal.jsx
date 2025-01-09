import React, { useState } from 'react'
import {Modal} from "@mantine/core";
import AddLocation from './AddLocation';
function AddPropertyModal({opened,setOpened}) {
 
 const [active,setActive]=useState(0);
const {user}=useAuth0();
 const [propertyDetails,setPropertyDetails]=useState({

title:"",
description:"",
price:0,
country:"",
ciyt:"",
address:"",
image:null,
facilities:{
    bedrooms:0,
    parkings:0,
    bathroom:0
},
useEmail:user?.email;

 })
 const nextstep=()=>{
    setActive((current)=>(current <4?curret+1:current))
 }
 const prevstep=()=>{
    setActive((current)=>(current >0?curret-1:current))
 }
 
    return (
    <Modal opened={opened} onClose={()=>setOpened(false)}
    closeOnClickOutside size ={"88rem"}
    
    > 
    <Container h={"34rem" } w={"100%"} >

    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="Location" description="Address">
   <AddLocation nextstep={nextstep} 
   propertyDetails={propertyDetails}
   setPropertyDetails={setPropertyDetails}
   
   
   />
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      {/* <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group> */}
    </>
    </Container>
      
    </Modal>
  )
}

export default AddPropertyModal
