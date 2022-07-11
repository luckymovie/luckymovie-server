const {db} = require("../config/db");

const getSalesData = (query) => {
    return new Promise ((resolve, reject) => {
        const {basedOn} = query
        let value = []
        let sqlQuery = ""

        if(basedOn !== "movie" && basedOn !== "location"){
            return reject({status: 400, err: {msg: "Please input a valid basedOn (movie or location)"}});
        }
        if (basedOn === "movie"){
            if(query.filter !== "weekly" && query.filter !== "monthly"){
                return reject({status: 400, err: {msg: "Please input a valid filter (weekly or monthly)"}});
            }
            if(!query.movie_id){
                return reject({status: 400, err: {msg: "Please input a valid movie_id"}});
            }
            if(query.filter === "weekly"){
                sqlQuery = "SELECT s.movie_id, m.title, t.date, to_char(t.date , 'Day') AS day_name, sum(t.total_price ) as total FROM transactions t join screening s on s.id = t.screening_id join movies m on m.id = s.movie_id  where t.payment_status  = 'PAID' and s.movie_id = $1 and  t.date > current_date - interval '7 days' group by s.movie_id, m.title, t.date  order by t.date asc; ";
                value = [query.movie_id]
            }
            if(query.filter === "monthly"){
                sqlQuery = "SELECT s.movie_id, m.title, EXTRACT(month  FROM t.date) as month, to_char(t.date , 'Month') AS month_name, EXTRACT(year  FROM t.date) as year, sum(t.total_price ) as total FROM transactions t join screening s on s.id = t.screening_id join movies m on m.id = s.movie_id  where t.payment_status  = 'PAID' and s.movie_id = $1 and  t.date > current_date - interval '12 months' group by s.movie_id, m.title, year, month, month_name order by year asc, month asc; ";
                value = [query.movie_id]
            }
        }
        if(basedOn === "location"){
            if(query.filter !== "weekly" && query.filter !== "monthly" && query.filter !== "yearly"){
                return reject({status: 400, err: {msg: "Please input a valid filter (weekly, monthly, or yearly)"}});
            }
            if(!query.location_id){
                return reject({status: 400, err: {msg: "Please input a valid location_id"}});
            }
            if(query.filter === "weekly"){
                sqlQuery = "select c.location_id, l.city,l.address, t.date, to_char(t.date , 'Day') AS day_name, sum(t.total_price ) as total FROM transactions t join screening s on s.id = t.screening_id join cinemas c on c.id = s.cinema_id  join location l on l.id = c.location_id  where t.payment_status  = 'PAID' and l.id = $1 and  t.date > current_date - interval '7 days' group by c.location_id, l.city,l.address, t.date  order by t.date asc; ";
                value = [query.location_id]
            }
            if(query.filter === "monthly"){
                sqlQuery = "SELECT c.location_id, l.city, l.address, EXTRACT(month  FROM t.date) as month, to_char(t.date , 'Month') AS month_name, EXTRACT(year  FROM t.date) as year, sum(t.total_price ) as total FROM transactions t join screening s on s.id = t.screening_id join cinemas c on c.id = s.cinema_id  join location l on l.id = c.location_id   where t.payment_status  = 'PAID' and l.id = $1 and  t.date > current_date - interval '12 months' group by c.location_id, l.city,l.address, year, month, month_name order by year asc, month asc; ";
                value = [query.location_id]
            }
            if(query.filter === "yearly"){
                sqlQuery = "SELECT c.location_id, l.city, l.address, EXTRACT(year  FROM t.date) as year, sum(t.total_price ) as total FROM transactions t join screening s on s.id = t.screening_id join cinemas c on c.id = s.cinema_id  join location l on l.id = c.location_id where t.payment_status  = 'PAID' and l.id = $1 group by c.location_id, l.city,l.address, year order by year asc; ";
                value = [query.location_id]
            }
        }
        db.query(sqlQuery, value)
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
    getSalesData,
}