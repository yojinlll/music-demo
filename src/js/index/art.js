{
  let view = {
    el: ".art",
    template: `
        <div class="album-art"></div>
        <div class="song-name"></div>
        <audio></audio>
    `,
    render(data){
      $(this.el).html(this.template)

    },
    replaceCover(cover){
      $(this.el).find($('.album-art')).attr('style',`background-image:url(${cover})`)
    },
    play(){
      $(this.el).find('audio')[0].play()
    },
    pause(){
      $(this.el).find('audio')[0].pause()
    }

  }
  let model = {}
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.bindEventHub()
      this.view.render()
    },
    bindEventHub(){
      window.eventHub.on('selectArt',(clickSong)=>{             // 选择歌曲作品
        $('.song-name')[0].innerHTML = clickSong.name           // 歌名
        $('.art > audio').attr('src',clickSong.url)             // 歌曲url
        this.view.replaceCover(clickSong.cover)
      })
      window.eventHub.on('emitPlayPause',()=>{                       // 播放和暂停歌曲
        let icon = $('#play-pause-button > use').attr('xlink:href')
        let name = $('.art > .song-name').text()
        if(icon==='#icon-play' && name){
          this.view.play()
          $('#play-pause-button > use').attr('xlink:href','#icon-pause')
          this.onEnded()
        }else{
          $('#play-pause-button > use').attr('xlink:href','#icon-play')
          this.view.pause()
        }
      })
    },
    onEnded(){
      $('.art > audio')[0].onended = (()=>{
        $('#play-pause-button > use').attr('xlink:href','#icon-play')
      })
    }
  }
  controller.init(view,model)
}