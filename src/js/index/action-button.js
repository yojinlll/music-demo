{
  let view = {
    el: '.action-button',
    template: `
    <div class="button-icon-1">
        <svg id="prev-button" class="icon" aria-hidden="true">
            <use xlink:href="#icon-prev"></use>
        </svg>
        <svg id="play-button" class="icon" aria-hidden="true">
            <use xlink:href="#icon-play"></use>
        </svg>
        <svg id="pause-button" class="icon" aria-hidden="true">
            <use xlink:href="#icon-pause"></use>
        </svg>
        <svg id="stop-button" class="icon" aria-hidden="true">
            <use xlink:href="#icon-stop"></use>
        </svg>
        <svg id="next-button" class="icon" aria-hidden="true">
            <use xlink:href="#icon-next"></use>
        </svg>
    </div>
    <div class="button-icon-2">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-list"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-lyric"></use>
        </svg>
    </div>
    `,
    render(data){
      $(this.el).html(this.template)
    }
  }
  let model = {}
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.render()
      this.bindEvents()
    },
    bindEvents(){
      $(this.view.el).on('click','#play-button',()=>{
        window.eventHub.emit('emitPlay')
      })
      $(this.view.el).on('click','#pause-button',()=>{
        window.eventHub.emit('emitPause')
      })
    }
  }
  controller.init(view, model)
}
