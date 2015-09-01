var ScorePanel = require('./ReactComponents/ScorePanel.jsx');

React.render(React.createElement(ScorePanel, null), doc.getElementById("reactScore")); 


module.exports = React.createClass
({displayName: "exports",
    render: function ()
    {
        return
        (
            React.createElement("div", null, "React is working!")
        );
    }
});


