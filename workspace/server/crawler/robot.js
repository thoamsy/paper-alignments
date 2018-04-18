require('isomorphic-fetch');

const fetchRobot = async url => {
  const robotUrl = `${url}/robots.txt`;
  const disallow = [];
  if (robotUrl) {
    const robot = await fetch(robotUrl).then(res => res.text());
    robot
      .split('\n')
      .filter(str => str.startsWith('Disallow'))
      .forEach(ban => disallow.push(ban.slice(ban.indexOf('/'))));
  }
  return disallow;
};

module.exports = fetchRobot;
