{
  let view = {
    el: '.songList-wrapper',
    template: `
    <ul class="songList"></ul>
    `,
    render(data){
      let $el = $(this.el)
      $el.html(this.template)
      let {songs} = data
      let liList = songs.map((song)=>{
        let $li = $('<li></li>').text(song.name)
        return $li
      })
      $el.find('ul').empty()
      liList.map((li)=>{
        $el.find('ul').append(li)
      })
    }

  }
  let model = {
    data: {
      songs: [],
      clickSong:undefined,
    },
    find(){
      let query = new AV.Query('Song')
      return query.find().then((songs) => {
        this.data.songs = songs.map((song) => {
          return {id: song.id, ...song.attributes}
        })
      })
      return songs

    }
  }
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.model.find().then(()=>{              //遍历数据库歌曲，将歌曲渲染进歌单中
        this.view.render(this.model.data)
      })
      this.bindEvents()
    },
    bindEvents(){
      $(this.view.el).on('click','li',(e)=>{
        let name = $(e.currentTarget).text()
        let {songs} = this.model.data
        songs.map((song)=>{
          if(name === song.name){
            this.model.data.clickSong = song
          }
        })
        window.eventHub.emit("selectArt", this.model.data.clickSong)
      })

    },
  }
  controller.init(view, model)
}
