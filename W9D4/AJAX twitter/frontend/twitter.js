const FollowToggle = require('./follow_toggle')

$(() => {
  $('button.follow-toggle').each((idx, el) => {
    let ft = new FollowToggle(el)
    console.log(ft)
  })
})