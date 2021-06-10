const express = require('express');
const bodyParser = require('body-parser');
const activitiesRouter = require('./routes/activity_route.js');
const instructionRouter = require('./routes/instruction_route.js')
const participantRouter = require('./routes/participant_route.js');
const perfilRouter = require('./routes/perfil_route.js');
const sectionRouter = require('./routes/section_route.js');
const teamRouter = require('./routes/team_route.js');
const used_materialRouter = require('./routes/used_materials_route.js');
const user_typeRouter = require('./routes/user_type_route.js');
const userRouter = require('./routes/user_route.js');

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
app.use('/instructions', instructionRouter);
app.use('/participant', participantRouter);
app.use('/perfil', perfilRouter);
app.use('/section', sectionRouter);
app.use('/team', teamRouter);
app.use('/used_material', used_materialRouter);
app.use('/user_type', user_typeRouter);
app.use('/user', userRouter);


app.listen(port, () => {
  console.log(`Scouts Hub app listening at http://localhost:${port}`)
});