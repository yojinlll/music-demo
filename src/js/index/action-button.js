{
  let view = {
    el: '.action-button',
    template: `
    <div class="button-icon-1">
        <svg id="prev-button" class="icon" aria-hidden="true">
            <use xlink:href="#icon-prev"></use>
        </svg>
        <svg id="play-pause-button" class="icon" aria-hidden="true">
            <use xlink:href="#icon-play"></use>
        </svg>
        <!--<svg id="stop-button" class="icon" aria-hidden="true">-->
            <!--<use xlink:href="#icon-stop"></use>-->
        <!--</svg>-->
        <svg id="next-button" class="icon" aria-hidden="true">
            <use xlink:href="#icon-next"></use>
        </svg>
    </div>
    <div class="button-icon-2">
        <svg id="list-button" class="icon" aria-hidden="true">
            <use xlink:href="#icon-list"></use>
        </svg>
        <svg id="lyric-button" class="icon" aria-hidden="true">
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
      $('#list-button').trigger('click')
      $('#lyric-button').trigger('click')

    },
    bindEvents(){
      $(this.view.el).on('click','#prev-button',()=>{
        window.eventHub.emit('emitPrevSong')
      })
      $(this.view.el).on('click','#play-pause-button',()=>{
        window.eventHub.emit('emitPlayPause')
      })
      $(this.view.el).on('click','#next-button',()=>{
        window.eventHub.emit('emitNextSong')
      })

      // 歌单歌词开关
      $(this.view.el).on('click','#list-button',()=>{
        $('.container').toggleClass('listActive')
      })
      $(this.view.el).on('click','#lyric-button',()=>{
        $('.container').toggleClass('lyricActive')

      })
    }
  }
  controller.init(view, model)
}
