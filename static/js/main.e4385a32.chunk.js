(this.webpackJsonppokemon=this.webpackJsonppokemon||[]).push([[0],{12:function(e,t,n){e.exports={bug:"Pokemon_bug__2SdzW",dark:"Pokemon_dark__bCMxD",dragon:"Pokemon_dragon__1yu6n",electric:"Pokemon_electric__Op9KL",fairy:"Pokemon_fairy__1if2Y",fighting:"Pokemon_fighting__sB_xL",fire:"Pokemon_fire__ONGJa",flying:"Pokemon_flying__1AjZa",ghost:"Pokemon_ghost__1pYMf",grass:"Pokemon_grass__3LSbM",ground:"Pokemon_ground__1hsZI",ice:"Pokemon_ice__23EPt",normal:"Pokemon_normal__3sb0g",poison:"Pokemon_poison__3H0bG",psychic:"Pokemon_psychic__wE9Bh",rock:"Pokemon_rock__txzAv",steel:"Pokemon_steel__1aATd",water:"Pokemon_water__3Ko8r"}},58:function(e,t,n){e.exports=n.p+"static/media/defaultAvatar.2b1594bb.png"},67:function(e,t,n){e.exports=n(95)},72:function(e,t,n){},73:function(e,t,n){},95:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(8),s=n.n(r),i=(n(72),n(20)),c=n(18),l=n(33),m=n(34),u=n(41),p=(n(73),n(40)),g=n(12),f=n.n(g),d=n(5),h=n(58),k=n.n(h),P=n(136),y=n(140),E=n(142),_=n(143),b=n(144),v=n(145),S=n(146),O=n(147),N=n(148),T=n(154),w=n(149),B=n(155),j=n(153),C=n(141),F=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.store.loadPokemons()}},{key:"render",value:function(){for(var e=this.props.store,t=e.Pokemons,n=e.count,a=e.limit,r=e.perPage,s=e.currentPage,i=e.loading,c=e.onLimitChanged,l=e.onPageChanged,m=e.setTemplateSearchByName,u=e.pokemonTypes,p=e.setSelectedTypes,g=e.selectedTypes,h=e.clearForm,F=function(e){switch(e){case"bug":return f.a.bug;case"dark":return f.a.dark;case"dragon":return f.a.dragon;case"electric":return f.a.electric;case"fairy":return f.a.fairy;case"fighting":return f.a.fighting;case"fire":return f.a.fire;case"flying":return f.a.flying;case"ghost":return f.a.ghost;case"grass":return f.a.grass;case"ground":return f.a.ground;case"ice":return f.a.ice;case"normal":return f.a.normal;case"poison":return f.a.poison;case"psychic":return f.a.psychic;case"rock":return f.a.rock;case"steel":return f.a.steel;case"water":return f.a.water}},x=Math.ceil(n/a),M=[],D=1;D<=x;D++)M.push(D);var L=Object(d.p)(t),A=function(e){if(g.includes(e))return"selected"};return o.a.createElement(P.a,{maxWidth:"lg"},o.a.createElement(y.a,{container:!0,spacing:2},o.a.createElement(y.a,{item:!0,xs:12,sm:3,md:2,lg:2},o.a.createElement("form",{onSubmit:m},o.a.createElement(B.a,{shrink:!0,htmlFor:"select-multiple-native"},"Search by Name"),o.a.createElement(C.a,{type:"text",name:"templatePokemonName",placeholder:"Enter pokemon's name"}),o.a.createElement(E.a,{type:"submit",className:"MuiButton-containedPrimary MuiButton-containedSizeSmall"},"Search")),o.a.createElement("form",{onSubmit:p},o.a.createElement(B.a,{shrink:!0,htmlFor:"select-multiple-native"},"Search by Type"),o.a.createElement(j.a,{multiple:!0,native:!0,variant:"outlined",inputProps:{name:"searchTypes"}},u.map((function(e){return o.a.createElement("option",{key:e,value:e,selected:A(e)},e)}))),o.a.createElement(E.a,{type:"submit",className:"MuiButton-containedPrimary MuiButton-containedSizeSmall"},"Search")),o.a.createElement("form",{onSubmit:h},o.a.createElement(E.a,{type:"submit",className:"MuiButton-outlinedSecondary MuiButton-containedSizeSmall"},"Clear Form"))),o.a.createElement(y.a,{item:!0,xs:12,sm:9,md:10,lg:10},i?o.a.createElement("div",null,"Loading..."):o.a.createElement("span",null,0==t.length?o.a.createElement("div",null,"Nothing found"):o.a.createElement(_.a,null,o.a.createElement(b.a,null,o.a.createElement(v.a,null,o.a.createElement(S.a,null,o.a.createElement(O.a,{align:"center"},"Name"),o.a.createElement(O.a,{align:"center"},"Types"),o.a.createElement(O.a,{align:"center"},"Speed"),o.a.createElement(O.a,{align:"center"},"Sp. Defense"),o.a.createElement(O.a,{align:"center"},"Sp. Attack"),o.a.createElement(O.a,{align:"center"},"Defense"),o.a.createElement(O.a,{align:"center"},"Attack"),o.a.createElement(O.a,{align:"center"},"HP"))),o.a.createElement(N.a,null,L.map((function(e){return o.a.createElement(S.a,{hover:!0},o.a.createElement(O.a,{align:"center"},o.a.createElement("img",{src:e.data.sprites.front_default?e.data.sprites.front_default:k.a,alt:e.data.name}),o.a.createElement("br",null),o.a.createElement("strong",null,e.data.name)),o.a.createElement(O.a,{align:"center"},e.data.types.map((function(e){return o.a.createElement("div",{className:F(e.type.name)},e.type.name)}))),e.data.stats.map((function(e){return o.a.createElement(O.a,{align:"center"}," ",e.base_stat)})))}))),o.a.createElement(w.a,null,o.a.createElement(S.a,null,o.a.createElement(O.a,{colSpan:8},o.a.createElement(T.a,{component:"div",rowsPerPageOptions:r,rowsPerPage:a,onChangeRowsPerPage:c,page:s,onChangePage:l,count:n}))))))))))}}]),t}(o.a.Component),x=Object(p.a)(F),M=n(17),D=n(45),L=n.n(D),A=n(42);Object(d.f)({enforceActions:!0});var U=function e(){var t=this;Object(i.a)(this,e),this.Pokemons=[],this.perPage=[10,20,50],this.limit=10,this.offset=0,this.count=0,this.currentPage=0,this.loading=!0,this.templatePokemonName=null,this.tmpCount=0,this.selectedTypes=[],this.tmpPokemons=[],this.pokemonTypes=["bug","dark","dragon","electric","fairy","fighting","fire","flying","ghost","grass","ground","ice","normal","poison","psychic","rock","steel","water"],this.loadPokemons=function(){return L.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L.a.awrap(A.get("https://pokeapi.co/api/v2/pokemon?offset=".concat(t.offset,"&limit=").concat(t.limit)).then((function(e){t.tmpCount=e.data.count;var n=e.data.results;t.templatePokemonName?t.searchPokemonsByName(n):t.getDetailsForPokemonsByUrl(n,e.data.count)})));case 2:case"end":return e.stop()}}))},this.getDetailsForPokemonsByUrl=function(e,n){Promise.all(e.map((function(e){return t.getPokemonsInfo(e.url)}))).then((function(e){Object(d.n)((function(){t.setCount(n),t.setPokemons(e),t.loading=!1}))}))},this.getPokemonsInfo=function(e){return A.get(e)},this.setSelectedTypes=function(e){t.loading=!0,t.templatePokemonName="";for(var n=e.target.searchTypes,a=[],o=0,r=n.length;o<r;o++)n[o].selected&&a.push(n[o].value);t.selectedTypes=a,t.getListUrlForSelectedTypes(),e.preventDefault()},this.getListUrlForSelectedTypes=function(){var e=[];Promise.all(t.selectedTypes.map((function(e){return t.getPokemonsByType(e)}))).then((function(n){n.map((function(t){t.data.pokemon.map((function(t){e.push(t.pokemon)}))})),t.tmpPokemons=Object(M.a)(new Map(e.map((function(e){return[JSON.stringify(e),e]}))).values()),t.selectionElementsForPage(t.tmpPokemons)}))},this.getPokemonsByType=function(e){return A.get("https://pokeapi.co/api/v2/type/"+e)},this.setTemplateSearchByName=function(e){t.selectedTypes=[],t.loading=!0,t.templatePokemonName=e.target.templatePokemonName.value,t.setOffset(0),t.loadPokemons(),e.preventDefault()},this.searchPokemonsByName=function(e){var n=e.filter((function(e){return e.name===t.templatePokemonName}));if(n.length>0)t.getDetailsForPokemonsByUrl(n,n.length);else if(t.offset<t.tmpCount){var a=t.offset+t.limit;t.setOffset(a),t.loadPokemons()}else t.setPokemons([]),t.loading=!1},this.clearForm=function(e){t.loading=!0,t.setOffset(0),t.selectedTypes=[],t.templatePokemonName="",t.loadPokemons(),e.preventDefault()},this.onLimitChanged=function(e){Object(d.n)((function(){var n=e.target.value;t.limit=n,t.offset=t.currentPage*n,t.loading=!0,t.selectedTypes.length>0?t.selectionElementsForPage(t.tmpPokemons):t.loadPokemons()}))},this.onPageChanged=function(e,n){Object(d.n)((function(){var e=n;t.currentPage=e,t.offset=e*t.limit,t.loading=!0,t.selectedTypes.length>0?t.selectionElementsForPage(t.tmpPokemons):t.loadPokemons()}))},this.selectionElementsForPage=function(e){var n=e.slice(t.offset,t.offset+t.limit);t.loading=!0,t.getDetailsForPokemonsByUrl(n,e.length)},this.setPokemons=function(e){t.Pokemons=e},this.setCount=function(e){t.count=e},this.setOffset=function(e){t.offset=e}},z=new(U=Object(d.h)(U,{Pokemons:d.m,count:d.m,offset:d.m,limit:d.m,currentPage:d.m,loading:d.m,templatePokemonName:d.m,tmpCount:d.m,onLimitChanged:d.d,onPageChanged:d.d,loadPokemons:d.d,getPokemonsStats:d.d,setPokemons:d.d,setCount:d.d,setTemplateSearchByName:d.d,searchPokemonsByName:d.d,handleSubmitName:d.d,setSelectedTypes:d.d,selectionElementsForPage:d.d})),I=n(150),J=n(152),W=n(151),G=function(e){return o.a.createElement(J.a,{position:"static"},o.a.createElement(I.a,null,o.a.createElement(W.a,{variant:"h6"},"Pokemons")))},H=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(G,null),o.a.createElement("main",{role:"main"},o.a.createElement("div",{className:"container"},o.a.createElement(x,{store:z}))))}}]),t}(o.a.Component),K=Object(p.a)(H);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(K,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[67,1,2]]]);
//# sourceMappingURL=main.e4385a32.chunk.js.map