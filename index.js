import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'


dotenv.config()
// import searchAPI from './api/searchAPI';
// import inputAPI from './api/inputAPI';
// import loginAPI from './api/loginAPI';
const config = process.env
const verrifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if(!token) {
        return res.status(403).send('token required')
    }
    console.log(token)
    const decoded = jsonwebtoken.verify(token, config.TOKEN_KEY)
    req.user = decoded
    return next()
}

const app = express();

app.use(express.static('client'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

const db = await sqlite.open({
    filename: './disease_information.db',
    driver: sqlite3.Database
});


console.log('db initialized')

// await db.migrate();

 const db2 = await sqlite.open({
    filename: './customer.db',
     driver: sqlite3.Database
});
 console.log('db initialized')

 

app.get('/', async (request, response) => {
    response.json({
        status: "api running",

    });
    console.log('status')
});

app.post('/api/diseases', async (request, response) => {
    const { disease_name } = request.body;
    await db.all(`SELECT * FROM diseases WHERE lower(disease_name) = ?`, disease_name.toLowerCase())
        .then(queryResults => {
            if (queryResults.length == 1) {
                response.json({
                    status: 'success',
                    isFound: true,
                    search_results: queryResults
                })
            } else {
                response.json({
                    status: "Disease Not Found",
                    isFound: false,
                })
            }

        })
})



app.get('/api/health_status', async function (req, res) {
    const health_status = await db2.all(`select * from health_status`)
    res.json({
        health_status

    })
})



app.post(`/api/health_status/update`, async (request, response) => {

    // console.log(request,body)

    const { diagnosis, picture_name, id } = request.body;

    const results = await db2.run(`update health_status set diagnosis = ?, picture_name = ?  where id = ?`,
        diagnosis,
        picture_name,
        id

    )

    //console.log(results)

    response.json({
        status: 'success'
    })


})


app.post(`/api/health_status/create`, async function (req, res) {
    const { diagnosis, picture_name } = req.body

    const result = await db2.run(`insert into health_status (diagnosis, picture_name) values(?,?)`, diagnosis, picture_name);
    console.log(result)

    res.json({
        status: 'success'
    })

})

app.post(`/api/health_status/delete`, async function (req, res) {
    const { id } = req.body

    const result = await db2.run(`delete from health_status where id = ?`, id);
    console.log(result)

    res.json({
        status: 'success'
    })

})

app.get('/api/customer', async function (req, res) {
    const customer = await db2.all(`select * from customer`)
    res.json({
        customer

    })
})

app.post(`/api/customer/update`, async (request, response) => {

    // console.log(request,body)

    const {first_name, last_name, email, manager, id } = request.body;

    const results = await db2.run(`update customer set first_name = ?, last_name = ?, email = ?, manager = ?  where id = ?`,
    first_name,
    last_name, 
    email, 
    manager,
    id

    )

    //console.log(results)

    response.json({
        status: 'success'
    })


})

app.post(`/api/customer/create`, async function (req, res) {
    const {first_name, last_name, email, username, password, contacts, manager} = req.body

    const result = await db2.run(`insert into customer (first_name, last_name, email, username, password, contacts, manager) values(?,?,?,?,?,?,?)`,first_name, last_name, email, username, password, contacts, manager);
    console.log(result)

    res.json({
        status: 'success'
    })

})


app.post(`/api/customer/delete`, async function (req, res) {
    const { id } = req.body

    const result = await db2.run(`delete from customer where id = ?`, id);
    console.log(result)

    res.json({
        status: 'success'
    })

})


app.get('/api/manager', async function (req, res) {
    const manager = await db2.all(`select * from manager`)
    res.json({
        manager

    })
})


app.post(`/api/manager/update`, async (request, response) => {

    // console.log(request,body)

    const {first_name, last_name, email, username, password, contacts, id } = request.body;

    const results = await db2.run(`update manager set first_name = ?, last_name = ?, email = ?, username = ?, password = ?, contacts = ? where id = ?`,
    first_name,
    last_name, 
    email, 
    username,
    password, 
    contacts, 
    id
    )

    //console.log(results)

    response.json({
        status: 'success'
    })


})


app.post(`/api/manager/create`, async function (req, res) {
    const {first_name, last_name, email, username, password, contacts, manager} = req.body

    const result = await db2.run(`insert into manager (first_name, last_name, email, username, password, contacts) values(?,?,?,?,?,?)`,first_name, last_name, email, username, password, contacts);
    console.log(result)

    res.json({
        status: 'success'
    })

})

app.post(`/api/manager/delete`, async function (req, res) {
    const { id } = req.body

    const result = await db2.run(`delete from manager where id = ?`, id);
    console.log(result)

    res.json({
        status: 'success'
    })

})


app.get('/api/projects', async function (req, res) {
    const projects = await db2.all(`select * from projects`)
    res.json({
       projects

    })
})


app.post(`/api/projects`, async (request, response) => {
    console.log(request.body)
    response.json({
        status: 'success'
    })
 
 } )



 app.post(`/api/projects/update`, async (request, response) => {

    // console.log(request,body)

    const { project_name, location, manager_id, id } = request.body;

    const results = await db2.run(`update projects set  project_name = ?, location = ? , manager_id = ? where id = ?`,
        project_name,
        location,
        manager_id,
        id

    )
      //console.log(results)
    response.json({
        status: 'success'
    })

})

app.post(`/api/projects/create`, async function (req, res) {
    const {project_name, location, manager_id} = req.body

    const result = await db2.run(`insert into projects (project_name, location, manager_id) values(?,?,?)`,project_name, location, manager_id);
    // console.log(result)

    res.json({
        status: 'success'
    })

})

app.post(`/api/projects/delete`, async function (req, res) {
    const { id } = req.body

    const result = await db2.run(`delete from projects where id = ?`, id);
    console.log(result)

    res.json({
        status: 'success'
    })

})

app.get('/api/detect', async function (req, res) {
    const detect = await db2.all(`select * from detect`)
    res.json({
       detect

    })
})

app.post(`/api/detect/update`, async (request, response) => {

    // console.log(request,body)

    const {detect_date, id } = request.body;

    const results = await db2.run(`update detect set detect_date = ? where id = ?`,
        detect_date,
        id

    )
      //console.log(results)
    response.json({
        status: 'success'
    })

})


app.post(`/api/detect/create`, async function (req, res) {
    const {detect_time, detect_date, project_id, customer_id, health_status_id} = req.body
    const currentDate = new Date().toISOString()

    const result = await db2.run(`insert into detect (detect_time, detect_date_time, project_id, customer_id, health_status_id) values(?,?,?,?,?)`, detect_time, currentDate, project_id, customer_id, health_status_id);
    console.log(result)

    res.json({
        status: 'success'
    })

})

app.post(`/api/detect/delete`, async function (req, res) {
    const { id } = req.body

    const result = await db2.run(`delete from detect where id = ?`, id);
    console.log(result)

    res.json({
        status: 'success'
    })

})


 app.post('/api/forms/login', async (request, response) => {

    
  const {username, email, password} = request.body
  const sql = `SELECT * FROM customer WHERE email = ?`
  await db2.all(sql, email)
  .then(queryResults => {
    if (queryResults.length == 1) {
        if(password === queryResults[0].password) {
            
            const token = jsonwebtoken.sign(
                {user_id : queryResults[0].id, email : queryResults[0].email}, 
                process.env.TOKEN_KEY,
                {expiresIn : "1h"}
            )
            queryResults[0].token = token
            response.json({
                status: 'success',
                isFound: true,
                user: queryResults[0]
            })
        }   
    } else {
        response.json({
            status: "Incorrect Username OR Password",
            isFound: false,
        })
    }
//   .then(result => {
//     if (result.length !== 0) {
//         const passwordEncrypted = bycrypt.hash(password, 10)
//     }
//     res.json({
//         data : result
//     })
  })
 })



 
 



 app.get('/api/forms/register', async function (req, res) {
    const register = await db2.all(`select * from customer`)
     res.json({
        register

   })
 })

 app.post(`/api/forms/register`, async (request, response) => {
    console.log(request.body)
    response.json({
        status: 'success'
    })
 
 } )


 app.post('/api/forms/register/create', async function (req, res) {
    const {username, email, password} = req.body

    // const result = await db2.run(`insert into register (username, email, password) values(?,?,?)`,username, email, password);
    // console.log(result)

    const sql = "SELECT * FROM customer WHERE email = ?"
    await db2.all(sql, email)
        .then(result => {
            if (result.length === 0) {
                 
                const result = db2.run(`insert into customer (username, email, password) values(?,?,?)`,username, email, password);
                // console.log(result)  
            }
        })

     


    res.json({
        status: 'success'
    })

 })



app.post(`/api/forms/register/delete`, async function (req, res) {
    const { id } = req.body

    const result = await db2.run(`delete from register where id = ?`, id);
    //console.log(result)

    res.json({
        status: 'success'
    })

})




const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`listen on port ${port}...`))