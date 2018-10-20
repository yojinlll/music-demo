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
        <div class="row">
            <label>
                封面
            </label>
            <input name="cover" type="text" value="__cover__">
        </div>
        <div class="row">
            <label>
                歌词
            </label>
            <textarea cols=80 rows=10 name="lyrics">__lyrics__</textarea>
        </div>
        <div class="row actions">
            <button type="submit">保存</button>
        </div>
    </form>
    `,
    render(data = {}) {
      let placeholders = ['name', 'url', 'singer', 'cover', 'lyrics']
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
      name: '', singer: '', url: '', id: '', cover: '', lyrics: ''
    },
    update(data){         // 更新 leancloud 数据库里的数据
      var song = AV.Object.createWithoutData('Song', this.data.id)
      song.set('name', data.name)
      song.set('singer', data.singer)
      song.set('url', data.url)
      song.set('cover', data.cover)
      song.set('lyrics', data.lyrics)
      return song.save().then((response)=>{
        Object.assign(this.data, data)
        return response
      })
    },
    create(data) {       // 点击保存，将数据存入leancloud
      var Song = AV.Object.extend('Song');
      var song = new Song();
      song.set('name', data.name);
      song.set('singer', data.singer);
      song.set('url', data.url);
      song.set('cover', data.cover)
      song.set('lyrics', data.lyrics)
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

      window.eventHub.on('select',(data)=>{           // list点击歌曲传来的 data, 保存该数据，并将其渲染文本框中，
        this.model.data = data
        this.view.render(data)
      })
      window.eventHub.on('new',(data)=>{     // 关联 new-song 与 song-list ，当 form 文本框有内容时，点击新建歌曲，判断文本框内容之前有无存储过（86，储存）
        if(this.model.data.id){
          this.model.data = {
            name:'',url:'',id:'',singer:'',cover:''
          }
        }else{
          Object.assign(this.model.data,data)
        }
        this.view.render(this.model.data)
      })
    },
    create(){     // 根据 form 文本框内容创建数据
      let needs = 'name singer url cover lyrics'.split(' ')
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
    },
    update(){     // 根据 form 文本框内容更新数据
      let needs = 'name singer url cover lyrics'.split(' ')
      let data = {}
      needs.map((string)=>{
        data[string] = this.view.$el.find(`[name="${string}"]`).val()
      })
      this.model.update(data)
        .then(()=>{
          window.eventHub.emit('update', JSON.parse(JSON.stringify(this.model.data)))
        })
    },
    bindEvents() {
      this.view.$el.on('submit', 'form', (e) => {
        e.preventDefault()
        if(this.model.data.id){
          console.log(111111111111)
          this.update()
        }else{
          console.log(222222)
          this.create()
        }
      })
    }
  }
  controller.init(view, model)
}