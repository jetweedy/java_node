/*
The following code completes a method on a Java 'RemoteDataSource' class to perform an http request
to a Node.js Express server to request a data modification and then return a revised list of the new data.
The rest of the java file has been omitted to respect intellectual property rights.
*/


	/* IMPLEMENT THIS METHOD! */
	public Set<Person> get(String[] ids) {

		HashSet<Person> people = new HashSet<Person>();

		try {
		    // create an object to represent the connection to a
		    // web server on port 3000 on this computer

			String surl = "http://localhost:3000/get?x=x";
			for (int i=0;i<ids.length;i++) {
				String nid = ids[i];
				surl = surl + "&id=" + nid;
			}
			URL url = new URL(surl);
		    HttpURLConnection conn = (HttpURLConnection)url.openConnection(); 
		    conn.setRequestMethod("GET");

		    // open connection and send HTTP request
		    conn.connect(); 

		    // now the response comes back
		    int responsecode = conn.getResponseCode();
		    // make sure the response has "200 OK" as the status
		    if (responsecode != 200) {
				System.out.println("Unexpected status code: " + responsecode);
		    }
		    else {
				// made it here, we got a good response, let's read it
				Scanner in = new Scanner(url.openStream());
				while (in.hasNext()) {
				    // read the next line of the body of the response
				    String line = in.nextLine();
//				    System.out.println(line);
				    // the rest of this code assumes that the body contains JSON
				    JSONParser parser = new JSONParser();
//				    JSONObject data = (JSONObject) parser.parse(line);
					JSONArray items = (JSONArray) parser.parse(line);
					Iterator jits = items.iterator();
					JSONObject jit;
					while(jits.hasNext()) {
						jit = (JSONObject)jits.next();
						String pid = (String)jit.get("id");
						String pstatus = (String)jit.get("status");
						people.add(new Person(pid, pstatus));
					}
				}
		    }

		}
		catch (Exception e) {
		    e.printStackTrace();
		}

		return people;





	}

}
