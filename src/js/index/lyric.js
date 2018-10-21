{
  let view = {
    el: '.lyric-wrapper',
    template: `
    <div class="lyric"></div>
    `,
    render(data){
      let $el = $(this.el)
      $el.html(this.template)
      $el.find('.lyric').text('')
      data.lyrics.split('\n').map((line)=>{
        let p = document.createElement('p')
        let regex = /\[([\d:.]+)\](.+)/
        let matches = line.match(regex)

        if(matches){
          p.textContent = matches[2]
          p.setAttribute('data-time',  matches[1])
        }else{
          p.textContent = 'balabala'
        }
        $el.find('.lyric').append(p)
      })
    }
  }
  let model = {}
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      window.eventHub.on('selectArt',(clickSong)=>{
        this.view.render(clickSong)
      })
    },
  }
  controller.init(view, model)
}
