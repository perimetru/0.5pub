"""Prepare a GitHub Pages branch containing only committed public site files."""
from pathlib import Path
import subprocess
root = Path(__file__).resolve().parents[1]
def git(*args, check=True):
    return subprocess.run(['git','-C',str(root),*args],text=True,capture_output=True,check=check)
if git('status','--porcelain=v1','--','site').stdout.strip():
    raise SystemExit('Commit the site/ changes before preparing publication.')
tree = git('rev-parse','HEAD:site').stdout.strip()
parent = None
local = git('rev-parse','--verify','refs/heads/gh-pages',check=False)
remote = git('rev-parse','--verify','refs/remotes/origin/gh-pages',check=False)
if local.returncode == 0:
    parent = local.stdout.strip()
    if remote.returncode == 0 and git('merge-base','--is-ancestor',remote.stdout.strip(),parent,check=False).returncode:
        raise SystemExit('Local gh-pages does not include the remote branch. Resolve it before publication.')
elif remote.returncode == 0:
    parent = remote.stdout.strip()
if parent and git('rev-parse',parent+'^{tree}').stdout.strip() == tree:
    print('gh-pages already matches committed site/.')
else:
    args = ['commit-tree',tree,'-m','Publish public 0.5 PUB website for 05pub.md']
    if parent: args += ['-p',parent]
    commit = git(*args).stdout.strip()
    git('update-ref','refs/heads/gh-pages',commit)
    print('Prepared gh-pages with only site/ files:',commit)
