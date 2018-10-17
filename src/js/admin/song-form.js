{
  let view = {
    el: '.page > main',
    init() {
      this.$el = $(this.el)
    },
    template: `
    <form class="form">
        <div class="row">
            <label>
                歌名
            </label>
            <input name="name" type="text" value="__name__">
        </div>
        <div class="row">
            <label>
                歌手
            </label>
            <input name="singer" type="text" value="__singer__">
        </div>
        <div class="row">
            <label>
                外链
            </label>
            <input name="url" type="text" value="__url__">
        </div>
        <div class="row actions">
            <button type="submit">保存</button>
        </div>
    </form>
    `,
    render(data = {}) {
      let placeholders = ['name', 'url', 'singer']
      let html = this.template
      placeholders.map((string) => {
        html = html.replace(`__${string}__`, data[string] || '')
      })
      $(this.el).html(html)
      if(data.id){
        $(this.el).prepend('<h1>编辑歌曲</h1>')
      }else{
        $(this.el).prepend('<h1>新建歌曲</h1>')
      }
    },
    reset(){
      this.render({})
    }
  }
  let model = {
    data: {
      name: '', singer: '', url: '', id: ''
    },
    create(data) {       // 点击保存，将数据存入leancloud
      var Song = AV.Object.extend('Song');
      var song = new Song();
      song.set('name', data.name);
      song.set('singer', data.singer);
      song.set('url', data.url);
      return song.save().then((newSong)=>{
        let {id,attributes} = newSong
        Object.assign(this.data,{id,...attributes})
      },(error)=>{
        console.log(error)
      })
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.view.render(this.model.data)
      this.bindEvents()

      window.eventHub.on('select',(data)=>{           // list点击歌曲传来的 data, 将其渲染文本框中
        this.model.data = data
        this.view.render(data)
      })
      window.eventHub.on('new',(data)=>{              // 关联 new-song 与 song-list ，当 form 文本框有内容时，点击新建歌曲，判断文本框内容之前有无存储过
        if(this.model.data.id){
          this.model.data = {
            name:'',url:'',id:'',singer:''
          }
        }else{
          Object.assign(this.model.data,data)
        }
        this.view.render(this.model.data)
      })
    },
    bindEvents() {
      this.view.$el.on('submit', 'form', (e) => {
        e.preventDefault()
        let needs = 'name singer url'.split(' ')
        let data = {}
        needs.map((string) => {
          data[string] = this.view.$el.find(`[name=${string}]`).val()
        })
        this.model.create(data)
          .then(()=>{
            this.view.reset()     // 重置文本框
            let object = JSON.parse(JSON.stringify(data))
            window.eventHub.emit('create',object)
          }
        )
      })
    }
  }
  controller.init(view, model)
}