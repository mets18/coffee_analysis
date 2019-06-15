   // Plot Tweets Count and publish in tweets div 
  function buildTweets(company) {

    console.log(`Company Selected in buildTweets : ` + company); 
  
    url=`/tweets/`+company;
  
    console.log(url);
  
    d3.json(url).then(function(data){
  
      console.log(data);
        
      var data2 = [{
        x: data["sentiments"],
        y: data["ratings"], 
        hovertext: data["company"],
        type: "bar"
      }];
    
      var layout2={ title: '<b>Bar Chart - </b> Sentiments'};
    
      Plotly.newPlot('tweets', data2, layout2); 
  
  });
}

   // Plot Tweets Count and publish in tweets div 
function buildReTweets(company) {

    console.log(`Company Selected in buildReTweets : ` + company); 
  
    url=`/retweets/`+company;
  
    console.log(url);
  
    d3.json(url).then(function(data){
  
      console.log(data);
        
      // var data2 = [{
      //   x: data["sentiments"],
      //   y: data["retweets"], 
      //   hovertext: data["company"],
      //   type: "bar"
      // }];
    
      // var layout2={ title: '<b>Bar Chart - </b> Retweets'};
    


              
      var data2 = [{
        values: data["retweets"],       
        labels: data["sentiments"],
        hovertext: data["company"],
        type: "pie"
      }];
    
      var layout2={ title: '<b>Pie Chart - </b> Retweets'};
      
      Plotly.newPlot('retweets', data2, layout2); 

  });
}
  // Get Sample Tweets and disply on dashboard
  function buildMetadata(company) {

      console.log(`Company Selected in buildMetadata : ` + company); 

      url=`/metadata/`+company;

      if (company == "SB"){
          v_company = "Starbucks"
      }
      else if (company == "MD") {
          v_company = "McDonald's"
      }
      else if (company == "DD"){
          v_company = "Dunkin Donuts"
      }
      
      console.log(url);
  
      var metadata = d3.select('#recent-tweets');



      d3.json(url).then(function(data){
        
        d3.select('#company-head').selectAll("h3").remove();
        d3.select('#company-head').append("h3").text(v_company);

        d3.select('#recent-tweets').selectAll("h5").remove();  
        Object.entries(data).forEach(([key, value]) =>  d3.select('#recent-tweets').append("h5").text( key + ' : ' + value ) );
  
      });  
  
  }

 // Plot Rating Counts and publish in rating div 
  function buildRating(company) {
  
    console.log(`Company Selected in buildRating : ` + company); 
  
    url=`/rating/`+company;
  
    console.log(url);
  
    d3.json(url).then(function(data){
  
      console.log(data);
        
      var data2 = [{
        values: data["ratings"],       
        labels: data["sentiments"],
        hovertext: data["company"],
        type: "pie"
      }];
    
      var layout2={ title: '<b>Pie Chart - </b> Sentiments'};
    
      Plotly.newPlot('rating', data2, layout2); 
      
  }); 
  
  }
  
// Plot Stores Counts and Revenues
function buildStores(company) {



    url=`/sales/`+company;

    d3.json(url).then(function(data){

      // Bubble Chart
      var trace1 = {
        x: data['year'],
        y: data['stores'],
        mode: 'markers',
        marker: {
            size: data['stores'].map(function(point){
              return parseFloat(point)/150}),
            color: data['stores']
            }
      };

      var data1 = [trace1];

      var layout = {
        title: "US Stores",
        xaxis: { title: "Year"},
        yaxis: { title: "Number of US Stores"},
        showlegend: false,
        height: 600,
        width: 600
      };

      Plotly.newPlot("stores", data1, layout);

      // Bar Chart

      var trace2 = {
        x: data['year'],
        y: data['revenue'],
        type: "bar"
      };

      var data2 = [trace2];

      var layout1 = {
        title: "US Revenues",
        xaxis: { title: "Year"},
        yaxis: { title: "Revenue in Millions of Dollars"}
      };

      Plotly.newPlot("sales", data2, layout1);
    });

}
  
  
  function init() {

    console.log('In Init');
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    var companies = [ 
                      {"company" : "SB" },  
                      {"company" : "MD" }, 
                      {"company" : "DD" }
                    ] 
             
    var arrayLength = companies.length;

    for (var i = 0; i < arrayLength; i++) {
        console.log(companies[i].company);
        //Populate Dropdown with company names
                    selector
                     .append("option")
                     .text(companies[i].company)
                     .property("value", companies[i].company);
            
        }                

      // Use the first Company (Starbucks) from the list to build the initial plots
      const firstSample = companies[0].company;
      buildTweets(firstSample);
      buildReTweets(firstSample);
      buildMetadata(firstSample);
      buildRating(firstSample);
//       buildStores(firstSample);
//       buildSales(firstSample);
//     });
  }
  
  function optionChanged(newSample) {
//     // Fetch new data each time a new sample is selected
      buildTweets(newSample);
      buildReTweets(newSample);
      buildMetadata(newSample);
      buildRating(newSample);
//       buildStores(newSample);
//       buildSales(newSample);
  }
  
  // Initialize the dashboard
  init();
  