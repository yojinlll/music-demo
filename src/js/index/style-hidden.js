{
  let view = {
    el:'.container',
    render(){
      window.eventHub.on('emitListToggle',()=>{
        $(this.el).toggleClass('listActive')
      })
      window.eventHub.on('emitLyricToggle',()=>{
        $(this.el).toggleClass('lyricActive')
      })
    }
  }
  let model = {}
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.render()
    }
  }
  controller.init(view,model)
}