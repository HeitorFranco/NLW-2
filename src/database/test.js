const Database = require("./db")
const createProffy = require("./createProffy")


Database.then(async function(db){
    //Inserir dados

    proffyValue = {
        name: "Homero Fábio",
        avatar: "https://scontent.fudi1-2.fna.fbcdn.net/v/t1.0-9/55669579_551182958710048_6731200616057536512_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=47H8NDEetPsAX_wIqYd&_nc_ht=scontent.fudi1-2.fna&oh=e09c7524261ff3e1ac4e3a3aa2df44fd&oe=5F540D09",
        whatsapp: "99999999",
        bio: "Professor de História"
    }

    classValue = {
        subject: 6,
        cost: "30"
        //o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 3,
            time_from: 520,
            time_to: 1420
        }
    ]

    //await createProffy(db, { proffyValue, classValue, classScheduleValues })

    //Consultar dados inseridos

    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    //consultar as classes de um determinado professor 
    //trazer junto os dados do professor

    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    // console.log(selectedClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é des 8h - 18h
    // o horário do time_from (8) precisa ser menor ou igual ao horário solicitado
    //o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "3"
        AND class_schedule.time_from <= "1500"
        AND class_schedule.time_to > "1500"
    `)

    // console.log(selectClassesSchedules)
})