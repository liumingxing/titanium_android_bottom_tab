if (Ti.version < 1.8) {
  alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

(function() {
  var osname = Ti.Platform.osname,
    version = Ti.Platform.version,
    height = Ti.Platform.displayCaps.platformHeight,
    width = Ti.Platform.displayCaps.platformWidth;

  function make_bottom_tab_view(arrs, windows, current_index){
  	 var wrapper = Ti.UI.createView({
  	 	height: 60,
  	 	left: 0,
  	 	right: 0,
  	 	bottom: 0,
  	 	backgroundColor: "#000",
  	 	layout: 'horizontal'
  	 });
  	 
  	 for(var i=0; i<arrs.length; i++){
  	 	var btn = Ti.UI.createView({
  	 		top: 1,
  	 		bottom: 0,
  	 		index: i,
  	 		width: 100/arrs.length + "%",
  	 		backgroundColor: "#eee"
  	 	});
  	 	btn.addEventListener("click", function(e){
  	 		windows[e.source.index].open();
  	 		
  	 		for(var j=1; j<arrs.length; j++){
  	 			if (j != e.source.index)
  	 				windows[j].close();
  	 		}
  	 	});
  	 	
  	 	btn.add(Ti.UI.createImageView({
  	 		image: arr[i].image,
  	 		top: 4,
  	 		width: 26,
  	 		height: 26,
  	 		touchEnabled: false
  	 	}));
  	 	var label = Ti.UI.createLabel({
  	 		text: arrs[i].text,
  	 		bottom: 4,
  	 		textAlign: "center",
  	 		height: 18,
  	 		font: {fontSize: 13},
  	 		touchEnabled: false,
  	 		color: i == current_index ? "#0F0" : "#ccc"
  	 	});
  	 	btn.add(label);
  	 	wrapper.add(btn);
  	 }
  	 
  	 return wrapper;
  }
  
  function open_window(win){
  	if (osname == "android"){
  		win.open();
  	}
  	else{
  		Ti.App.tabGroup.activeTab.open(win, {
			animated : true
		});
  	}
  }

  var win1 = Ti.UI.createWindow({
  	title: "win1",
  	theme: "MyTheme1",
  	exitOnClose: true,
  	backgroundColor: "#fff",
  });
  var tableview = Ti.UI.createTableView({
  	bottom: 60
  });
  
  tableview.addEventListener("click", function(e){
  	var w = Ti.UI.createWindow({
  		title: "window 5",
  		backgroundColor: "green"
  	});
  	w.add(Ti.UI.createLabel({
	  	top: 100,
	  	text: "I'm Win5",
	  	font: {fontSize: 22}
	  }));
  	open_window(w);
  	w.addEventListener("android:back", function(e){
  		w.close({
  			activityExitAnimation: Ti.Android.R.anim.slide_out_right,
  			activityEnterAnimation: Ti.Android.R.anim.slide_in_left
  		});
  	});
  	
  	w.addEventListener("click", function(e){
  		var w1 = Ti.UI.createWindow({
	  		title: "window 6",
	  		backgroundColor: "blue"
	  	});
	  	open_window(w1);
  	});
  });
  for(var i=0; i<100; i++){
  	var row = Ti.UI.createTableViewRow({
  		height: Ti.UI.SIZE
  	});
  	row.add(Ti.UI.createLabel({
  		text: "Hello " + i,
  		height: Ti.UI.SIZE,
  		color: "black",
  		left: 10,
  		top: 10,
  		bottom: 10
  	}));
  	tableview.appendRow(row);
  }
  win1.add(tableview);
  
  
  var win2 = Ti.UI.createWindow({
  	title: "win2",
  	theme: "MyTheme2",
  	backgroundColor: "#fff",
  });
  win2.add(Ti.UI.createLabel({
  	top: 100,
  	text: "I'm Win2",
  	font: {fontSize: 22}
  }));
  
  var win3 = Ti.UI.createWindow({
  	title: "win3",
  	theme: "MyTheme2",
  	backgroundColor: "#fff"
  });
  win3.add(Ti.UI.createLabel({
  	top: 100,
  	text: "I'm Win3",
  	font: {fontSize: 22}
  }));
  
  var btn = Ti.UI.createButton({
  	top: 200,
  	width: 100,
  	title: "click me"
  });
  btn.addEventListener("click", function(e){
  	var w = Ti.UI.createWindow({
  		title: "window 5",
  		backgroundColor: "green"
  	});
  	w.add(Ti.UI.createLabel({
	  	top: 100,
	  	text: "I'm Win5",
	  	font: {fontSize: 22}
	  }));
  	open_window(w);
  	
  	w.addEventListener("click", function(e){
  		var w1 = Ti.UI.createWindow({
	  		title: "window 6",
	  		backgroundColor: "blue"
	  	});
	  	open_window(w1);
  	});
  });
  win3.add(btn);
  
  var win4 = Ti.UI.createWindow({
  	title: "win4",
  	theme: "MyTheme2",
  	backgroundColor: "#fff",
  });
  win4.add(Ti.UI.createLabel({
  	top: 100,
  	text: "I'm Win4",
  	font: {fontSize: 22}
  }));
  
  
  if (osname == "android"){
  	var arr = [{text: "tab1", image: "/KS_nav_ui.png"		},
  			 {text: "tab2", image: "/KS_nav_views.png"	},
  			 {text: "tab3", image: "/KS_nav_ui.png"		},
  			 {text: "tab4", image: "/KS_nav_views.png"	}];
  			 
	  var tabs1 = make_bottom_tab_view(arr, [win1, win2, win3, win4], 0);
	  var tabs2 = make_bottom_tab_view(arr, [win1, win2, win3, win4], 1);
	  var tabs3 = make_bottom_tab_view(arr, [win1, win2, win3, win4], 2);
	  var tabs4 = make_bottom_tab_view(arr, [win1, win2, win3, win4], 3);
	  
	  win1.add(tabs1);
	  win2.add(tabs2);
	  win3.add(tabs3);
	  win4.add(tabs4);
	  
	  win1.open();
  }
  else{
  	var tabGroup = Ti.UI.createTabGroup({
  		tintColor: "#2A4968",
  		tabsTintColor: "#2A4968",
		backgroundColor: "white",
		//barColor : "#2A4968",
  	});
  	Ti.App.currentTabGroup = tabGroup;
		
	var tab1 = Ti.UI.createTab({
		title: win1.title,
		icon: 'KS_nav_ui.png',
		window: win1
	});

	var tab2 = Ti.UI.createTab({
		title: win2.title,
		icon: 'KS_nav_views.png',
		window: win2
	});
	
	var tab3 = Ti.UI.createTab({
		title: win3.title,
		icon: 'KS_nav_ui.png',
		window: win3
	});
	
	var tab4 = Ti.UI.createTab({
		title: win4.title,
		icon: 'KS_nav_views.png',
		window: win4
	});
	tabGroup.addTab(tab1);
	tabGroup.addTab(tab2);
	tabGroup.addTab(tab3);
	tabGroup.addTab(tab4);
	
	tabGroup.open();
	Ti.App.tabGroup = tabGroup;
	
  }
})();
