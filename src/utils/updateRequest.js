import axios from "axios";

const updateRequest = id => {
    axios.get('https://comp4537triviagame-api.herokuapp.com/api/v1/request/' + id)
        .then(req => {
            let count = req.data.requests;
            axios.put('https://comp4537triviagame-api.herokuapp.com/api/v1/request/update/' + id, { requests: ++count })
                .then()
                .catch((err) => console.log(err));
        })
        .catch(function (error) {
            console.log(error);
        })
};

export default updateRequest;
