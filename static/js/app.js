   // Plot Tweets Count and publish in tweets div 
  function buildTweets(sample) {

      // @TODO: Complete the following function that builds the metadata panel
  
      // Use `d3.json` to fetch the metadata for a sample
      // Use d3 to select the panel with id of `#sample-metadata`
  
      console.log(`Sample Data : ` + sample); 
  
      url=`/metadata/`+sample;
  
      console.log(url);
  
      var metadata = d3.select('#sample-metadata');
  
      d3.json(url).then(function(data){
  
        d3.select('#sample-metadata').selectAll("h5").remove();  
        Object.entries(data).forEach(([key, value]) =>  d3.select('#sample-metadata').append("h5").text( key + ' : ' + value ) );
  
      });  
  
  }
  
  // Get Sample Tweets and disply on dashboard
  function buildMetadata(company) {

      console.log(`Company Selected in buildMetadata : ` + company); 

      url=`/metadata/`+company;
  
      console.log(url);
  
      var metadata = d3.select('#recent-tweets');
  
      d3.json(url).then(function(data){
  
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
    
  // Plot Stores Counts and publish in stores div 
  function buildStores(sample) {
  
    // @TODO: Use `d3.json` to fetch the sample data for the plots
  
      // @TODO: Build a Bubble Chart using the sample data
  
      url=`/samples/`+sample;
  
      d3.json(url).then(function(data){      
              
        var data1 = [{
          x: data["otu_ids"],
          y: data["sample_values"],
          mode: 'markers',
          marker: {
            size: data["sample_values"],
            color: data["otu_ids"],
            text: data["otu_labels"]
          }
        }];
        
        var layout1={ title: '<b>Bubble Chart</b> <br> Sample Values'};            
  
        Plotly.newPlot('bubble', data1, layout1);
  
        var data2 = [{
          values: data["sample_values"].slice(0,10),       
          labels: data["otu_ids"].slice(0,10),
          hovertext: data["otu_labels"].slice(0,10),
          type: "pie"
        }];
      
        var layout2={ title: '<b>Pie Chart</b> <br> Sample Values'};
      
        Plotly.newPlot('pie', data2, layout2);  
      });
      
  }

  // Plot Sales Counts and publish in sales div 
  function buildSales(sample) {
  
    // @TODO: Use `d3.json` to fetch the sample data for the plots
  
      // @TODO: Build a Bubble Chart using the sample data
  
      url=`/samples/`+sample;
  
      d3.json(url).then(function(data){      
              
        var data1 = [{
          x: data["otu_ids"],
          y: data["sample_values"],
          mode: 'markers',
          marker: {
            size: data["sample_values"],
            color: data["otu_ids"],
            text: data["otu_labels"]
          }
        }];
        
        var layout1={ title: '<b>Bubble Chart</b> <br> Sample Values'};            
  
        Plotly.newPlot('bubble', data1, layout1);
  
        var data2 = [{
          values: data["sample_values"].slice(0,10),       
          labels: data["otu_ids"].slice(0,10),
          hovertext: data["otu_labels"].slice(0,10),
          type: "pie"
        }];
      
        var layout2={ title: '<b>Pie Chart</b> <br> Sample Values'};
      
        Plotly.newPlot('pie', data2, layout2);  
      });
      
  }
  
  function init() {

    console.log('In Init');
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    var companies = [ 
                      {"company" : "SB" },  
                      {"company" : "MC" }, 
                      {"company" : "DD" },
                      {"company" : "All"} 
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
//       buildTweets(firstSample);
      buildMetadata(firstSample);
      buildRating(firstSample);
//       buildStores(firstSample);
//       buildSales(firstSample);
//     });
  }
  
  function optionChanged(newSample) {
//     // Fetch new data each time a new sample is selected
//       buildTweets(newSample);
      buildMetadata(newSample);
      buildRating(newSample);
//       buildStores(newSample);
//       buildSales(newSample);
  }
  
  // Initialize the dashboard
  init();
  