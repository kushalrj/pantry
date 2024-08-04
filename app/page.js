'use client'

// import Image from "next/image";

import { useState,useEffect } from "react";
import {firestore} from '@/firebase'
import { Box, Modal, Typography, Stack, TextField, Button } from "@mui/material";
import { collection, deleteDoc,doc, getDocs,getDoc, query, setDoc } from "firebase/firestore";
export default function Home() {
  const [inventory,setInventory]=useState([])
  const [open,setOpen]=useState(false)
  const [itemName,setItemName]=useState('')

  const updateInventory=async ()=>{

    const snapshot=query(collection(firestore,'pantry'))
    const docs=await getDocs(snapshot)
    const inventoryList=[]

    docs.forEach((doc)=>{
      inventoryList.push(
        {
          name:doc.id,
          ...doc.data(),
        }
      )
    })
    setInventory(inventoryList)
    
    // console.log(inventoryList)
  }
  const removeItem= async (item)=>{
    //reference for specific item frm pantry data set eg boxes,perfumes...
    const docRef= doc(collection(firestore,'pantry'),item)
    //making snapcshot of it
    const docSnap=await getDoc(docRef)
    if(docSnap.exists()){
      const{quantity}=docSnap.data()
      if(quantity===1){
        await deleteDoc(docRef)
      }
      else{
        await setDoc(docRef,{quantity: quantity-1})
      }
    }
    await updateInventory()
  }
  const addItem= async (item)=>{
    //reference for specific item frm pantry data set eg boxes,perfumes...
    const docRef= doc(collection(firestore,'pantry'),item)
    //making snapcshot of it
    const docSnap=await getDoc(docRef)
    if(docSnap.exists()){
      const{quantity}=docSnap.data()
     setDoc(docRef,{quantity: quantity+1})
      
    }
    else{
      await setDoc(docRef,{quantity:1})
    }
    await updateInventory()
  }
  const handleOpen=()=>setOpen(true)
  const handleClose=()=>setOpen(false)
  useEffect(()=>{
    updateInventory()
    // console.log(inventory)
  },[])
  
  return( <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems={"center"} flexDirection="column" gap={2}>
   
   
   <Modal open={open} onClose={handleClose}>
    <Box
    position="absolute"
    top="50%"
    left="50%"
    sx={{transform:"translate(-50%,-50%)"}}
    width={400}
    display="flex"
    bgcolor="white"
    border="2px solid #000"
    boxShadow={24}
    p={4}
    dispay="flex"
    flexDirection={"column"}
    gap={3}
    >
      <Typography variant="h6" color="black">Add Item  </Typography>
      <Stack width="100%" direction="row" spacing={2}>
      <TextField
      variant="outlined"
      fullWidth
      value={itemName}
      onChange={(e)=>{
        setItemName(e.target.value)
      }}></TextField>
      <Button  variant="outlined" onClick={()=>{
        addItem(itemName)
        setItemName("")
        handleClose()
      }}> 
      Add
      </Button>
      
    
    </Stack>
    </Box>
   </Modal>
  
    <Button varient="outlined" onClick={()=>{
      handleOpen()
    }}> Add new Item
    </Button>
    <Box border="1px solid #333">
      <Box width="800px" height="100px" bgcolor="#ADD8E6"
      display="flex" justifyContent="center" alignItems={"center"} p={2}>
      <Typography variant="h2" color="#333">
        Inventory Items
      </Typography>
      </Box>
    
    
    <Stack width="800px" height="300px" spacing={2} overflow="auto">
      {inventory.map(({ name, quantity }) => (
        <Box
          key={name}
          width="100%"
          minHeight="150px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor="#f0f0f0"
          padding={5}
        >
          <Typography variant="h3" color="#333" textAlign="center">
            {name.charAt(0).toUpperCase()+name.slice(1)}
          </Typography>
          <Typography variant="h3" color="#333" textAlign="center">
            {quantity}
          </Typography>
          <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={()=>{removeItem(name)}}>Remove
          </Button>
          <Button variant="contained" onClick={()=>{addItem(name)}}>Add
          </Button></Stack>
        </Box>
      ))}
    </Stack>
      </Box>
      </Box>
    )
}
