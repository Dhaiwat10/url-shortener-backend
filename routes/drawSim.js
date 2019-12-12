const router = require('express').Router();
const validation = require('../util/validate');

const baseTeams = [
    {id: 1, name: 'PSG', country: 'France', pos: 1, group: 'A'},
    {id: 2, name: 'Real Madrid', country: 'Spain', pos: 2, group: 'A'},
    {id: 3, name: 'Bayern Munich', country: 'Germany', pos: 1, group: 'B'},
    {id: 4, name: 'Spurs', country: 'England', pos: 2, group: 'B'},
    {id: 5, name: 'Man City', country: 'England', pos: 1, group: 'C'},
    {id: 6, name: 'Atalanta', country: 'Italy', pos: 2, group: 'C'},
    {id: 7, name: 'Juventus', country: 'Italy', pos: 1, group: 'D'},
    {id: 8, name: 'Atletico', country: 'Spain', pos: 2, group: 'D'},
    {id: 9, name: 'Liverpool', country: 'Italy', pos: 1, group: 'E'},
    {id: 10, name: 'Napoli', country: 'Italy', pos: 2, group: 'E'},
    {id: 11, name: 'Barcelona', country: 'Spain', pos: 1, group: 'F'},
    {id: 12, name: 'Dortmund', country: 'Germany', pos: 2, group: 'F'},
    {id: 13, name: 'Leipzig', country: 'Germany', pos: 1, group: 'G'},
    {id: 14, name: 'Lyon', country: 'France', pos: 2, group: 'G'},
    {id: 15, name: 'Valencia', country: 'Spain', pos: 1, group: 'H'},
    {id: 16, name: 'Chelsea', country: 'England', pos: 2, group: 'H'}
]

router.route('/').get((req, res) => {
    
    const newResults = [];

    let teams = [...baseTeams];
    //console.log(teams);

    let tieCount=1;
    console.log(tieCount)

    while(tieCount<=8) {
        let possible = false;

        const team1 = teams[Math.ceil(teams.length*Math.random())-1];
        const team2 = teams[Math.ceil(teams.length*Math.random())-1];

        possible = validation.validate(team1, team2);

        if(possible) {
            newResults.push([team1, team2]);
                
            teams.splice(teams.indexOf(team1), 1);
            teams.splice(teams.indexOf(team2), 1);

            tieCount++;
        }
    }

    //console.log(newResults);

    res.json({results: [...newResults]});
})

module.exports = router;