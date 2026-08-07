const express = require ('express');
const app = express();
const PORT = 3000 ;
// const cors = require('cors');

app.use(express.static('public'));






// app.use(cors()); // Place this near app.use(express.json())// Place this near app.use(express.json())

app.use(express.json());

app.use((req,res,next)=>{
    console.log(`[${new Date().toISOString()}]  ${req.method} request to ${req.url}`);
     next() //passing controll to the next function 
 })

 let messdata = [
    
    {
       
        id : '1',
        mess_name : 'annapurnamess',
        location: 'dypatiladis',
        todays_lunch : "panner ,pulav "

    },
    {
       id : '2',
        mess_name : 'mess#1',
        location: '800 meter from coep college',
        todays_lunch : "methi , chaptati, dal , rice ,dahi ",
        
 
    },
    {
        id : '3',
        mess_name : 'messs lajawab',
        location : 'exact near to pmc metro station near aissms ',
        todays_lunch : "rajma , chaptati, dal , rice ,dahi "
    },
    
 ]



 app.get('/mess/address',(req,res)=>{  
    const {address} = req.query; // address name is extracted from address name which is come in route insidre ? query 


     if (!address) {
         return res.status(400).json({ error: "query parameter is required" });
     }

   

    const cleanaddress = req.query.address.trim().toLowerCase();  // the address name which is extracted then it is trim means extra spaces are removed and convert it into lowercase 

   

    const near_by_messes = messdata.filter((md) =>{  //mess data is filtered and checked the condition where mess data location and inputed location is true 
       const mess_location = md.location ? md.location.trim().toLowerCase() : '';

       return mess_location.includes(cleanaddress) // then it is searched inside mess data 
    
 })
   if(near_by_messes.length === 0 ){
       res.status(404).json({ message: "No messes found near this location" }); // this is for handling empty data array which is returned when messes near thic location is noy registered
   }
      
   return res.status(200).json(near_by_messes); // otherwise return mess data  for inputed address
   
    
 })

 app.get('/mess/:name',(req,res)=>{
    const {name} = req.params ;

    if(!name){
        return res.status(400).json({error:"Name parameter is required"})
    }
    const mess_by_name = messdata.filter((md)=>{
       return  md.mess_name.toLowerCase().includes(name.toLowerCase());
    })

    res.status(200).json(mess_by_name)
})

// app.put('/mess/:id/menu',(req,res)=>{
//     const {id} = req.params;

//     const {todays_lunch , todays_dinner} = req.body;
     
//     const mess = messdata.find(md=>
//         md.id === id);

//     if(!mess){
//         return res.status(400).json(`MESS ID REQUIRED `)
//     }
    

//     if(!mess){
//         return res.status(404).json({error: `mess not found`})


//     }

//     if(todays_lunch)  mess.todays.lunch = string(todays_lunch).trim();
//      if(todays_dinner)  mess.todays.dinner = string(todays_dinner).trim();

    
//     return res.status(200).json({
//         message:"menu updated sucessfully",
//         updatedMess : mess 
//     });
// });

app.put('/mess/:id/menu', (req, res) => {
  const { id } = req.params;
  const { todays_lunch, todays_dinner } = req.body;

  const mess = messdata.find((m) => m.id === id);

  if (!mess) {
    return res.status(404).json({ error: "Mess not found" });
  }

  if (todays_lunch) mess.todays_lunch = todays_lunch;
  if (todays_dinner) mess.todays_dinner = todays_dinner;

  return res.status(200).json({
    message: "Menu updated successfully!",
    updatedMess: mess
  });
});

app.post('/mess',(req,res)=>{
    let {mess_name,location} = req.body ;

    if(!mess_name || !mess_location){
        return res.status(400).json({error:`please enter the required data`})
    }

    let new_mess = {
        id : string( messdata.length + 1),
        mess_name : mess_name,
        location : location
    }

    messdata.push(new_mess);
    res.status(200).json({
        message:'mess added ',
        data:new_mess
    });

})


app.delete('/mess/:id',(req,res)=>{
    let {id} = req.params ;

    const messindex = messdata.findindex(md => md.id === id ); 
         
         if(messindex === -1 ){
            res.status(400).json("mess id not found") 
        }
        messdata.splice(messindex,1);
        return res.status(200).json({error : " deleted sucessfully "})  //by using splice we told js to got to index at mess index and remove the item 1 from that index
       
    
})


   

    






 app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
 })