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
        $('audio').attr('src',clickSong.url)                    // 歌曲url
        this.view.replaceCover(clickSong.cover)
      })
      window.eventHub.on('emitPlay',()=>{                       // 播放歌曲
        this.view.play()
      })
      window.eventHub.on('emitPause',()=>{                      // 停止歌曲
        this.view.pause()
      })
    }
  }
  controller.init(view,model)
}