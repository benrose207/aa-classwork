
class FollowToggle {
  constructor (el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");
    this.render();
    //this.handleClick()// = this.handleClick.bind(this);
    this.$el.on("click", this.handleClick.bind(this))
  }

  render() {
    //debugger
    if(this.followState) {
      this.$el.html('Unfollow!')
    } else {
      this.$el.html('Follow!')
    }
  }

  handleClick() {
    let that = this;  
    event.preventDefault();
      let type = "POST"
      if (this.followState) {
        type = "DELETE"
      }
      this.followState = !this.followState
      this.render()
      //let boundRender = this.render.bind(this)
    $.ajax({
      url: `/users/${this.userId}/follow`,
      type: type,
      dataType: "JSON",
      //success() {
        //that.render()
       // debugger
        //console.log(this)
        // alert('Success!')
      //}
    }).then((res) => {
      //debugger
      //that.followState = !that.followState
      //that.render()
      alert('Success!')
    }
    )
  }
  

}

module.exports = FollowToggle;