package RestTest::Controller::Root;

use strict;
use warnings;
use base 'Catalyst::Controller';
use Data::Dumper;
use IO::File;

#
# Sets the actions in this controller to be registered with no prefix
# so they function identically to actions created in MyApp.pm
#
__PACKAGE__->config->{namespace} = '';

=head1 NAME

RestTest::Controller::Root - Root Controller for RestTest

=head1 DESCRIPTION

[enter your description here]

=head1 METHODS

=cut

=head2 default

=cut

sub default : Private {
    my ( $self, $c ) = @_;

    # Hello World
	#$c->stash->{template} = 'index.tt';
	my $path = $c->config->{root} . "/index.html";
	my $fh = new IO::File;
	if ($fh->open("< $path")) {

    $c->response->body($fh);
	
	}else {

    $c->response->body("screw u");
	}
	undef $fh;
}

=head2 end

Attempt to render a view, if needed.

=cut 

sub end : Private {}

=head1 AUTHOR

luke saunders

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
