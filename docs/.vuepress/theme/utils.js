import axios from 'axios'

export function getCodefund(template = 'default') {
  const codefundId = isGitee() ? '79' : '116'
  axios
    .get(
      `https://api.codefund.app/properties/${codefundId}/funder.html?template=${template}`
    )
    .then(function(response) {
      document.getElementById('codefund').innerHTML = response.data
    })
}
export function isGitee() {
  const origin = window.location.origin
  if (origin.includes('gitee.io')) {
    return true
  }
  return false
}
