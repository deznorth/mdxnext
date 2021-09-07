const simpleGit = require('simple-git')(process.cwd());
const BRANCH = 'main';

export default function handler(req, res) {
  const location = req.rawHeaders.findIndex(h => h === 'X-GitHub-Event');
  const githunAction = location > -1 && req.rawHeaders[location + 1];
  let response = '';

  if (req.method === 'POST') {
    if (req.body.ref === `refs/heads/${BRANCH}` && githunAction === 'push') {
      response = `event - Push request on branch "${BRANCH}" will be processed`;
      res.status(202).send(response);
      console.log(response);
      triggerUpdate();
    } else {
      response = `event - Request not on branch "${BRANCH}". It will be skipped`;
      res.status(202).send(response);
      console.log(response);
    }
  } else {
    // Handle any other HTTP method
    res.status(404).send();
  }
}

const triggerUpdate = () => {
  simpleGit.subModule(['status']).then(r => console.log(r));
  simpleGit.submoduleUpdate(['--remote', '--merge', 'posts']).catch(
    err => console.log(err)
  );
};
