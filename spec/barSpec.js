describe("In order to get a drink as a guest I want a barkeeper to mix it.", function() {
	describe("An Order", function() {
	  it("should contain an added Vodka Lemon", function() {
	    var order = new Order();
	    order.add(menu.wodkaLemon);
	    expect(order.items).toContain(menu.wodkaLemon);
	  });
	});

	describe("The barkeeper", function(){
		it("should return an ordered wodka lemon", function() {
			var order = new Order();
			order.add(menu.wodkaLemon);
			// oops, nur ein Mock
			spyOn(barkeeper, "accept").andReturn([new WodkaLemon()]);
			expect(barkeeper.accept(order)).toContain(new WodkaLemon());
		});
	});
});

