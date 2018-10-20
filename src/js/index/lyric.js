{
  let view = {
    el: '.lyric-wrapper',
    template: `
    <ul class="lyric"></ul>
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
      songs: []
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
      this.model.find().then(()=>{
        this.view.render(this.model.data)
      })
    }
  }
  controller.init(view, model)
}
