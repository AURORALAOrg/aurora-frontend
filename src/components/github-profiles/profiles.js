let users = [
    {name:"Anwar Sanchez", login:"zleypner", role:"CoFounder and Full Stack Dev"},
    {name:"Gerson Loaiza", login:"Gerson2102", role:"CoFounder and Full Stack Dev"},
    {name:"Chris Fernandez", login:"ChrisFernandezVivas", role:"CoFounder and Backend Dev"},
    {name:"Josué Araya", login:"Josue19-08", role:"CoFounder and Frontend Dev"},
    {name:"Manuel Jiménez", login:"ManuelJG1999", role:"CoFounder and Frontend Dev"}
];


const fetchGitHubProfile = async (user) => {
    try {
        const response = await fetch(`https://api.github.com/users/${user.login}`);
        if(!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const interfaceUser = {
            id:data.id,
            avatar: data.avatar_url,
            name: user.name,
            login:user.login,
            role: user.role,
            url: data.html_url
        }
        return interfaceUser;
    } catch (error) {
        return null;
    }
};

const getGitHubProfiles = async () => {
    const profiles = await Promise.all(users.map(user => fetchGitHubProfile(user)));
    const validProfiles = profiles.filter(profile => profile !== null);
    return validProfiles;
};

export default getGitHubProfiles;