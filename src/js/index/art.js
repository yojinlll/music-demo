{
  let view = {
    el: ".art",
    template: `
        <div class="album-art"></div>
        <div class="song-name"></div>
    `,
    render(data){
      $(this.el).html(this.template)
    }
  }
  let model = {}
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.render()
      window.eventHub.on('showArt',(clickSong)=>{
        $('.song-name')[0].textContent = clickSong.name
      })
    }
  }
  controller.init(view,model)
}