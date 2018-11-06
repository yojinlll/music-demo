{
  let view = {
    el: '.controls',
    template: `
    <div class="bar-container">
        <div class="bar"></div>
    </div>
    <div class="action-button">
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
    </div>
    `,
    render(data){
      $(this.el).html(this.template)
    }
  }
  let model = {
    data: {
      barWidth: undefined,
      duration: undefined,
    }
  }
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
      $(this.view.el).on('click', '.bar-container', (e) => {            // 控制播放时间点
        let currentPlay = e.clientX - $('.bar')[0].getBoundingClientRect().left
        $('.art > audio')[0].currentTime = this.model.data.duration * (currentPlay / this.model.data.barWidth)
      })

      // 播放条
      window.eventHub.on('emitPlayPause', () => {                         // 选择歌曲作品，监听播放条

        let playBar = setInterval(() => {                                 // 定时更新播放条
          let barWidth = this.model.data.barWidth = $('.bar-container').outerWidth()
          let duration = this.model.data.duration = $('.art > audio')[0].duration
          let currentTime = $('.art > audio')[0].currentTime

          $('.bar').css('width', `${barWidth * (currentTime / duration)}px`)


          if ($('.bar').outerWidth() === barWidth) {
            $('.bar').css('width', '0px')
            clearInterval(playBar)
            currentTime = 0
          }

          window.eventHub.on('emitNextSong', () => {
            clearInterval(playBar)
            $('.bar').css('width', '0px')
            currentTime = 0
          })
          window.eventHub.on('emitPlayPause', () => {
            clearInterval(playBar)
          })
          window.eventHub.on('emitPrevSong', () => {
            clearInterval(playBar)
            $('.bar').css('width', '0px')
            currentTime = 0
          })
        }, 100)
      })


      // 播放 & 暂停   -->   art.js 里监听
      $(this.view.el).on('click', '#prev-button', () => {
        window.eventHub.emit('emitPrevSong')
      })
      $(this.view.el).on('click', '#play-pause-button', () => {
        window.eventHub.emit('emitPlayPause')
      })
      $(this.view.el).on('click', '#next-button', () => {
        window.eventHub.emit('emitNextSong')
      })

      // 歌单歌词开关
      $(this.view.el).on('click', '#list-button', () => {
        $('.container').toggleClass('listActive')
      })
      $(this.view.el).on('click', '#lyric-button', () => {
        $('.container').toggleClass('lyricActive')

      })
    },
  }
  controller.init(view, model)
}
