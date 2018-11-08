{
  let view = {
    el: ".art",
    template: `
        <div class="album-art">
            <svg id="icon-music" class="icon" aria-hidden="true">
                <use xlink:href="#icon-music"></use>
            </svg>
        </div>
        <div class="song-name"></div>
        <audio></audio>
    `,
    render(data){
      $(this.el).html(this.template)

    },
    replaceArt(clickSong){                // 替换作品（ 歌名 url 封面 ）
      this.render()
      if(clickSong.singer !== ''){
        $('.song-name')[0].innerHTML = clickSong.name + ' - ' + clickSong.singer
      }else{
        $('.song-name')[0].innerHTML = clickSong.name
      }

      $('.art > audio').attr('src', clickSong.url)
      $(this.el).find($('.album-art')).attr('style', `background-image:url(${clickSong.cover})`)
      if(clickSong.cover){
        $('.album-art').empty()
      }else{
        $(this.el).find($('.album-art')).removeAttr('style')
      }
    },
  }
  let model = {
    data: []
  }
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.render()
      this.bindEventHub()
    },
    bindEventHub(){
      window.eventHub.on('showArt', (data) => {             // 选择歌曲作品
        this.model.data = data
        $('#play-pause-button > use').attr('xlink:href', '#icon-play')
        this.view.replaceArt(data.clickSong)
      })
      window.eventHub.on('emitPlayPause', () => {                       // 播放和暂停歌曲
        this.playToggle()
        this.onEnded()
      })
      window.eventHub.on('emitPrevSong', () => {
        $('#play-pause-button > use').attr('xlink:href', '#icon-play')
        let name = $('.song-name')[0].innerHTML
        let {songs} = this.model.data

        for (let i = 0; i < songs.length; i++) {
          if(songs[i].name === name){
            if(i-1 === -1){
              this.view.replaceArt(songs[songs.length-1])
            }else{
              this.view.replaceArt(songs[i - 1])
            }
          }
        }
      })
      window.eventHub.on('emitNextSong', () => {
        $('#play-pause-button > use').attr('xlink:href', '#icon-play')
        let name = $('.song-name')[0].innerHTML
        let {songs} = this.model.data

        for (let i = 0; i < songs.length; i++) {
          if(songs[i].name === name){
            if(i+1 === songs.length){
              this.view.replaceArt(songs[0])
            }else{
              this.view.replaceArt(songs[i + 1])
            }
          }
        }
      })
    },
    playToggle(){                         // 播放 & 暂停
      let icon = $('#play-pause-button > use').attr('xlink:href')
      let name = $('.art > .song-name').text()
      if (icon === '#icon-play' && name) {
        $(this.view.el).find('audio')[0].play()
        $('#play-pause-button > use').attr('xlink:href', '#icon-pause')
      }else {
        $('#play-pause-button > use').attr('xlink:href', '#icon-play')
        $(this.view.el).find('audio')[0].pause()
      }
    },
    onEnded(){
      $('.art > audio')[0].onended = (() => {
        $('#play-pause-button > use').attr('xlink:href', '#icon-play')
      })
    }
  }
  controller.init(view, model)
}