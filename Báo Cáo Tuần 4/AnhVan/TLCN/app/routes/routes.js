var bodyParser = require("body-parser");
module.exports=function(app,connection) {
    app.use(bodyParser.json()); // parse application/json
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.use(bodyParser.urlencoded({
        'extended': 'true'
    }));
    app.get('/partials/:name', function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });
    app.get('/', function (req, res) {
        res.render('Home');
    });

    app.post('/Dangky', urlencodedParser, function (req, res) {
        var data = req.body;


        var query = connection.query('insert into user set ?', data, function (err, result) {
            if (err) {
                console.error(err);
                //return res.send(err);
            }
            else {
                return res.send('Ok');
            }
        });

    });
    app.post('/admin', urlencodedParser, function (req, res) {
        var data = req.body;

        //mysql.query('Insert into user_info (profile_picture,news) VALUES (""+req.body.pics+"",""+req.body.feed+"")',function(err, results, fields)
        //var query = connection.query('insert into user_info(profile_picture) VALUES ("'+profile_picture+'")',function (err, result)
        var query = connection.query('insert into user set ?', data, function (err, result) {
            if (err) {
                console.error(err);
                //return res.send(err);
            }
            else {
                return res.json({
                    id: result.insertId
                })
            }
        });

    });

    app.get('/logout', function(req, res){
        // destroy the user's session to log them out
        // will be re-created next request
        req.session.destroy(function(){
            res.redirect('/');
        });
    });
    function finduser (username,pass,callback){
        connection.query('SELECT * FROM user where name=? and pass=? ',[username,pass], function(err, rows, fields) {
            if (err) {
                callback(err, null);
            } else{


                callback(null, rows[0]);
            }

        }

        );


    }
    app.post('/dangnhap', function(req, res){
        user=  req.body.username;
        pass=req.body.password;
        console.log(user+pass);
        finduser(user,pass, function(err, content) {
            if (err) {
                console.log(err);
                // Do something with your error...
            } else {
                if (content===undefined) {
                    res.json({
                        state: 'false',
                        user: '',
                        message:'Authentication failed, please check your'
                    });
                } else {
                    return  res.json({
                        state: 'true',
                        admin: content.admin,
                        user:  content.name,
                        message: 'Dang Nhap thanh cong: '
                    });

                }
            }
        });

    });
    app.get('/admin',function(req,res)
    {
        connection.query("SELECT * from user",function(err,rows)
        {
            if(err)
            {
                console.log("Problem with MySQL"+err);
            }
            else
            {
                res.end(JSON.stringify(rows));
            }
        });
    });
    app.put('/admin',function(req,res)
    {

        data={
            name:  req.body.name,
            email:  req.body.email,
            address:  req.body.address,
            pass : req.body.pass,
            idUser:  req.body.iduser
        }
        connection.query("UPDATE user SET name = ?, pass = ?, email = ?, address= ? WHERE idUser=?",
            [data.name,data.pass,data.email,data.address,data.idUser],function(err,result)
            {
                if(err)
                {
                    console.log("Problem with MySQL"+err);
                }
                else
                {
                    if(result.changedRows==1)
                        res.json({
                            message:'Thanh Cong'
                        });
                    else{
                        res.json({
                            message:'That bai '
                        });
                    }

                }
            });
    });
    app.delete('/admin/:id',function(req,res)
    {
        id=req.params.id;
        connection.query("DELETE FROM user WHERE idUser = ?",[id],function(err,result)
        {

            if(err)
            {
                res.json({message:"That bai"});

            }
            else
            {
                res.json({message:"Da xoa thanh cong"});
            };
        });
    });
    app.put('/admin',function(req,res)
    {
        data={idUser :req.body.id,
            name :req.body.name,
            pass :req.body.pass,
            email :req.body.email,
            address :req.body.address
        }
        connection.query('UPDATE user SET email = ? WHERE idUser = ?', [data], function(err, result){
            if(err) throw err;

            console.log('Record Updated ' + result.changedRows + ' rows');
        });
    });


    



    return app;
}

