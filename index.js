const express = require('express');
const bodyParser = require('body-parser');
const activitiesRouter = require('./routes/activity_route.js');

const app = express();
const port = 60000;

app.use(bodyParser.json());
// qunado criar o post exprimentar remover isto
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'sucess'});
})

// chamar pela atividades {'/atividades'}
app.use('/activities',activitiesRouter);

app.listen(port, () => {
  console.log(`Scouts Hub app listening at http://localhost:${port}`)
});