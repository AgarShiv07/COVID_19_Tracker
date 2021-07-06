console.log('Mic Testing')
const express=require('express')
const request=require('request')
const app=express()

//MiddleWares
app.set("view engine", "ejs")
app.get('/',(req,res)=>{
    //res.send('Hello from my Application')
    res.render("home")
})

// app.get('/portfolio',(req,res)=>{
//     res.send('This is my portfolio')
// })

//Imp= See the use of : , Also here we have used tilde ` in res.send in order 
//to use req.params.Roll
// app.get('/portfolio/:Roll', (req,res)=>{
//     console.log(req.params)
//     //Template String in JS, Anything inside ${} referred as JS
//     res.send(`You are viewing the result of Student with Roll No ${req.params.Roll}`)
// })

app.get('/result',(req,res)=>{
    // Here we use req.query and not req.params
    //res.send(`You searched for ${req.query.movieName}`)
    const url=`http://www.omdbapi.com/?apikey=83f31ef2&s=${req.query.movieName}`
    request(url, function (error, response, body){
        if(!error && response.statusCode===200){
            const data=JSON.parse(body)
            //res.send(data)
            res.render('result',{moviesDump: data})
        }
        else{
            res.send("Something Went Wrong")
        }
    })
})
app.get('/result/:id',(req,res)=>{
    const url=`http://www.omdbapi.com/?apikey=83f31ef2&i=${req.params.id}`
    request(url,function(error,response,body){
        if(!error && response.statusCode===200){
                const data=JSON.parse(body)
                if(data.Response==='false'){
                    res.send("Movie Not Found")
                }
                else{
                    res.render('Info',{i: data})
                }
            }
        else{
            res.send("Something Went Wrong")
        }
    })
})

app.get('*',(req,res)=>{
    res.send("Error 404, Page Not Found")
})
app.listen(3000,()=>{
    console.log('Server has started')
})

