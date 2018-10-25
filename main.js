$(function() {
if (!$('#bmkletFilterNestList').length){

var bmkletNestFilter = new Object();
bmkletNestFilter.author = '@fZueTRtMvmKohv5';
bmkletNestFilter.lisence = 'GPLv2';

bmkletNestFilter.filteringNestList = function(){
	var nestList = bmkletNestFilter.getLSFilterNestList();
	if(nestList == ''){
		$('.pokemon').parent().show();
	}else{
		$('.pokemon').parent().hide();
		var nestFilterSelectWord = bmkletNestFilter.getNestFilterSelectWord();
		$(nestFilterSelectWord).parent().show();
	}
};



// input  =>   [1,2]
// output =>   '.pokemon[src=aaa001.png],.pokemon[src=aaa002.png],'
bmkletNestFilter.getNestFilterSelectWord = function(){
	var word ='';
	list = bmkletNestFilter.getLSFilterNestList()
	list.some(function(item){
		var pokeSrc = bmkletNestFilter.getPokeSrc(item);
		word += '.pokemon[src="' + pokeSrc + '"],';
	});
	return word.slice(0,-1);
};

bmkletNestFilter.getPokeSrc = function(no){
	var pokeNo = ('000'+ no).slice(-3);
	var costomIco = $('#custom_icon').val();
	var customIcoUrl = costomIco.replace('@ID3@.png','');
	var encocustomIcoUrl = encodeURIComponent(customIcoUrl);
	var icoUrl = 'https://cdn08.net/gw/?url=' + encocustomIcoUrl + pokeNo + '.png';
	return icoUrl;

};



bmkletNestFilter.replaceNo = function(name){
	var pokeNo;
	var result = Object.keys(pokemon_list).some(function(key) {
		if (this[key].name == name) {
			pokeNo = this[key].no
			return this[key].no;
		} 
	}, pokemon_list);
	return pokeNo;
};

bmkletNestFilter.replaceName = function(no){
	var pokeName;
	Object.keys(pokemon_list).some(function(key) {
		if (this[key].no == no) {
			pokeName = this[key].name
			return this[key].name;
		} 
	}, pokemon_list);
	return pokeName;
};

bmkletNestFilter.setLSFilterNestList = function(){
	var FilterNestList =  $('#bmkletFilterNestList').val().split(',');
	var FilterNestNoList = FilterNestList.map(function(item){
		return bmkletNestFilter.replaceNo(item);
	});
	localStorage.setItem('bmklet_LSFilterNestList',FilterNestNoList);
};

bmkletNestFilter.getLSFilterNestList = function(name){
	var filterNestText = localStorage.getItem('bmklet_LSFilterNestList');
	if (filterNestText == null) {
		return '';
	};
	var filterNestList = filterNestText.split(',');
	if(!name) {
		return filterNestList;
	}else if(name){
		var filterNestNoList = filterNestList.map(function(item){
			return bmkletNestFilter.replaceName(item); 
		});
		return filterNestNoList;
	};
};





	bmkletNestFilter.filteringNestList();
	bmkletNestFilter.insertNestVal = (bmkletNestFilter.getLSFilterNestList(true));
	bmkletNestFilter.nestSettingHtml = '<div class="reward_filter mb30"><h2 class="fs14 wiki_bold mt15">ポケモンの巣フィルター</h2><div class="clearfix"><div style="float:left;width:100%;"><input type="text" id="bmkletFilterNestList" value="'+bmkletNestFilter.insertNestVal+'" placeholder="ポケモンリスト"></div></div></div>'
	$('#panel2').append(bmkletNestFilter.nestSettingHtml);


	bmkletNestFilter.observer = new MutationObserver(function (MutationRecords, MutationObserver) {
		bmkletNestFilter.setLSFilterNestList();
		bmkletNestFilter.filteringNestList();
	});

	bmkletNestFilter.observer.observe($('#popup_menu').get(0), {
		attributes: true,
	}); 
	bmkletNestFilter.observer.observe($('.leaflet-marker-pane').get(0), {
		childList: true,
	});
};


})
