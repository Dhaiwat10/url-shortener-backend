module.exports = {
    validate: (team1, team2) => {
        let isValid = true;
    
        if(team1.country === team2.country)
            return false
        
        if(team1.group === team2.group)
            return false
    
        if(team1.pos === team2.pos)
            return false
    
        return isValid;
    }
};