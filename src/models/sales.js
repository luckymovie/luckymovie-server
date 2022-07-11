const {db} = require("../config/db");

const getWeeklySales = (movie_id) => {
    return new Promise ((resolve, reject) => {
        const sqlQuery = "SELECT sum(t.total_price ) as total, s.movie_id, m.title, t.date, to_char(t.date , 'Day') AS \"day_name\" FROM transactions t join screening s on s.id = t.screening_id join movies m on m.id = s.movie_id where t.payment_status  = 'PAID' and s.movie_id = $1 and  t.date > current_date - interval '7 days' group by s.movie_id, m.title, t.date order by t.date asc";
        db.query(sqlQuery, [movie_id])
        .then((result) => {
            if(result.rowCount === 0){
                return reject({status: 400, err: {msg: "Data not found"}});
            }
            return resolve(result.rows);
        })
        .catch((err) => {
            reject({status: 500, err});
        });
    });
};

const getMonthlySales = (movie_id) => {
    return new Promise ((resolve, reject) => {
        const sqlQuery = "SELECT sum(t.total_price ) as total, s.movie_id, m.title, EXTRACT(month  FROM t.\"date\") as month, to_char(t.\"date\" , 'Month') AS month_name, EXTRACT(year  FROM t.\"date\") as year FROM transactions t join screening s on s.id = t.screening_id join movies m on m.id = s.movie_id  where t.payment_status  = 'PAID' and s.movie_id = $1 group by s.movie_id, m.title, year, month, month_name order by year asc, month asc";
        db.query(sqlQuery, [movie_id])
        .then((result) => {
            if(result.rowCount === 0){
                return reject({status: 400, err: {msg: "Data not found"}});
            }
            return resolve(result.rows);
        })
        .catch((err) => {
            console.log(err)
            reject({status: 500, err});
        });
    });
};
module.exports = {
    getWeeklySales, getMonthlySales
}